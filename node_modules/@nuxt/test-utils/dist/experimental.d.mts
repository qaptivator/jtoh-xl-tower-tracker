/**
 * This is a function to render a component directly with the Nuxt server.
 */
declare function $fetchComponent(filepath: string, props?: Record<string, any>): Promise<any>;
declare function componentTestUrl(filepath: string, props?: Record<string, any>): string;

export { $fetchComponent, componentTestUrl };
