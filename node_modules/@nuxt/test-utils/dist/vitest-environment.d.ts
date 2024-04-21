import { Environment } from 'vitest';
import { App } from 'h3';

declare const _default: Environment;

type NuxtBuiltinEnvironment = 'happy-dom' | 'jsdom';
interface NuxtWindow extends Window {
    __app: App;
    __registry: Set<string>;
    __NUXT_VITEST_ENVIRONMENT__?: boolean;
    __NUXT__: any;
    $fetch: any;
    fetch: any;
    IntersectionObserver: any;
    Headers: any;
}
type EnvironmentNuxt = (global: any, options: Record<string, any>) => Promise<{
    window: NuxtWindow;
    teardown(): void;
}>;

export { type EnvironmentNuxt, type NuxtBuiltinEnvironment, type NuxtWindow, _default as default };
