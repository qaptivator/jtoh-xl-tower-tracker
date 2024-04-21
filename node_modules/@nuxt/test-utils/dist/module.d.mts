import * as _nuxt_schema from '@nuxt/schema';
import { UserConfig } from 'vitest';

interface NuxtVitestOptions {
    startOnBoot?: boolean;
    logToConsole?: boolean;
    vitestConfig?: UserConfig;
}
declare const _default: _nuxt_schema.NuxtModule<NuxtVitestOptions>;

export { type NuxtVitestOptions, _default as default };
