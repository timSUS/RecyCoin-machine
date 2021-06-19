declare module "interpolate-html-plugin";
declare module "duplicate-package-checker-webpack-plugin";
declare module "minify-json-webpack-plugin";
declare module "script-ext-html-webpack-plugin";

declare module "*.svg" {
  const content: any;
  export default content;
}
