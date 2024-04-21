import { createFetch as createFetch$1 } from 'ofetch';
import { indexedDB } from 'fake-indexeddb';
import { joinURL } from 'ufo';
import { createApp, toNodeListener, defineEventHandler } from 'h3';
import defu from 'defu';
import { toRouteMatcher, createRouter, exportMatcher } from 'radix3';
import { populateGlobal } from 'vitest/environments';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { importModule } from 'local-pkg';

const happyDom = (async function(_, { happyDom = {} }) {
  const { Window, GlobalWindow } = await importModule(
    "happy-dom"
  );
  const window = new (GlobalWindow || Window)(happyDom);
  return {
    window,
    teardown() {
      window.happyDOM.cancelAsync();
    }
  };
});

const jsdom = (async function(global, { jsdom = {} }) {
  const { CookieJar, JSDOM, ResourceLoader, VirtualConsole } = await importModule("jsdom");
  const {
    html = "<!DOCTYPE html>",
    userAgent,
    url = "http://localhost:3000",
    contentType = "text/html",
    pretendToBeVisual = true,
    includeNodeLocations = false,
    runScripts = "dangerously",
    resources,
    console = false,
    cookieJar = false,
    ...restOptions
  } = jsdom;
  const window = new JSDOM(html, {
    pretendToBeVisual,
    resources: resources ?? (userAgent ? new ResourceLoader({ userAgent }) : void 0),
    runScripts,
    url,
    virtualConsole: console && global.console ? new VirtualConsole().sendTo(global.console) : void 0,
    cookieJar: cookieJar ? new CookieJar() : void 0,
    includeNodeLocations,
    contentType,
    userAgent,
    ...restOptions
  }).window;
  window.scrollTo = () => {
  };
  return {
    window,
    teardown() {
    }
  };
});

const environmentMap = {
  "happy-dom": happyDom,
  jsdom
};
const index = {
  name: "nuxt",
  transformMode: "web",
  async setup(global, environmentOptions) {
    const url = joinURL("http://localhost:3000", environmentOptions?.nuxtRuntimeConfig.app?.baseURL || "/");
    const environmentName = environmentOptions.nuxt.domEnvironment;
    const environment = environmentMap[environmentName] || environmentMap["happy-dom"];
    const { window: win, teardown } = await environment(global, defu(environmentOptions, {
      happyDom: { url },
      jsdom: { url }
    }));
    win.__NUXT_VITEST_ENVIRONMENT__ = true;
    win.__NUXT__ = {
      serverRendered: false,
      config: {
        public: {},
        app: { baseURL: "/" },
        ...environmentOptions?.nuxtRuntimeConfig
      },
      data: {},
      state: {}
    };
    const app = win.document.createElement("div");
    app.id = environmentOptions.nuxt.rootId;
    win.document.body.appendChild(app);
    if (environmentOptions?.nuxt?.mock?.intersectionObserver) {
      win.IntersectionObserver = win.IntersectionObserver || class IntersectionObserver {
        observe() {
        }
        unobserve() {
        }
        disconnect() {
        }
      };
    }
    if (environmentOptions?.nuxt?.mock?.indexedDb) {
      win.indexedDB = indexedDB;
    }
    const h3App = createApp();
    if (!win.fetch) {
      await import('node-fetch-native/polyfill');
      win.URLSearchParams = globalThis.URLSearchParams;
    }
    const localCall = createCall(toNodeListener(h3App));
    const localFetch = createFetch(localCall, win.fetch);
    const registry = /* @__PURE__ */ new Set();
    win.fetch = (init, options) => {
      if (typeof init === "string") {
        const base = init.split("?")[0];
        if (registry.has(base) || registry.has(init)) {
          init = "/_" + init;
        }
      }
      return localFetch(init, options);
    };
    win.$fetch = createFetch$1({ fetch: win.fetch, Headers: win.Headers });
    win.__registry = registry;
    win.__app = h3App;
    const { keys, originals } = populateGlobal(global, win, {
      bindFunctions: true
    });
    const timestamp = Date.now();
    const routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: environmentOptions.nuxtRouteRules || {} })
    );
    const matcher = exportMatcher(routeRulesMatcher);
    const manifestOutputPath = joinURL(
      "/",
      environmentOptions?.nuxtRuntimeConfig.app?.buildAssetsDir || "_nuxt",
      "builds"
    );
    const manifestBaseRoutePath = joinURL("/_", manifestOutputPath);
    h3App.use(
      `${manifestBaseRoutePath}/latest.json`,
      defineEventHandler(() => ({
        id: "test",
        timestamp
      }))
    );
    h3App.use(
      `${manifestBaseRoutePath}/meta/test.json`,
      defineEventHandler(() => ({
        id: "test",
        timestamp,
        matcher,
        prerendered: []
      }))
    );
    h3App.use(
      `${manifestBaseRoutePath}/meta/dev.json`,
      defineEventHandler(() => ({
        id: "test",
        timestamp,
        matcher,
        prerendered: []
      }))
    );
    registry.add(`${manifestOutputPath}/latest.json`);
    registry.add(`${manifestOutputPath}/meta/test.json`);
    registry.add(`${manifestOutputPath}/meta/dev.json`);
    return {
      // called after all tests with this env have been run
      teardown() {
        keys.forEach((key) => delete global[key]);
        originals.forEach((v, k) => global[k] = v);
        teardown();
      }
    };
  }
};

export { index as default };
