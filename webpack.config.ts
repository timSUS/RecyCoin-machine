/* eslint-disable @typescript-eslint/triple-slash-reference */
///<reference path="global.d.ts" />

import { join, resolve } from "path";
import TerserPlugin from "terser-webpack-plugin";
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
  WebpackPluginInstance,
  optimize,
  //DefinePlugin,
  ProvidePlugin,
} from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { GenerateSW } from "workbox-webpack-plugin";
//import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import InterpolateHtmlPlugin from "interpolate-html-plugin";
import MinifyJSONWebpackPlugin from "minify-json-webpack-plugin";
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import { Configuration as WebpackDevelopmentServerConfiguration } from "webpack-dev-server";
import UnusedWebpackPlugin from "unused-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevelopmentServerConfiguration;
}

type TargetType = "main" | "preload" | "renderer";

const { AggressiveMergingPlugin }: typeof optimize = optimize;
const indexHTML: string = "index.html";

const getEntryPoint = (targetType: TargetType): string => {
  const entryFileLiteral = {
    renderer: "index.tsx",
    preload: "preload.ts",
    main: "index.ts",
  };
  return join(__dirname, "src", targetType, entryFileLiteral[targetType]);
};

const getBabelTarget = (): string => {
  return "last 2 Chrome versions, last 2 Firefox versions";
};

const setupConfig = (
  _environment: unknown,
  { mode, hot }: { mode: string; hot: boolean },
): Configuration[] => {
  const getConfig = (targetType: TargetType): Configuration => {
    const entryPoint: string = getEntryPoint(targetType);
    const babelTarget: string = getBabelTarget();
    return {
      mode: mode === "development" ? mode : "production",
      entry: entryPoint,
      target: targetType === "renderer" ? "web" : `electron-${targetType}`,
      optimization: {
        minimize: mode !== "development",
        minimizer: [new TerserPlugin() as unknown as WebpackPluginInstance],
        usedExports: true,
      },
      devtool: "source-map",
      module: {
        rules: [
          targetType === "renderer" && {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: "url-loader",
              },
            ],
          },
          targetType === "renderer" && {
            test: /\.svg$/,
            use: ["@svgr/webpack"],
          },
          {
            test: /\.(js)$/,
            enforce: "pre",
            use: ["source-map-loader"],
          },
          {
            test: /\.(ts|tsx)$/,
            include: join(__dirname, "src"),
            exclude: [/(node_modules|bower_components)/],
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/env",
                      {
                        targets: babelTarget,
                        bugfixes: true,
                        useBuiltIns: "usage",
                        corejs: "3",
                      },
                    ],
                    "@babel/preset-typescript",
                    [
                      "@babel/preset-react",
                      {
                        runtime: "automatic",
                      },
                    ],
                  ],
                  plugins: [
                    "@emotion",
                    hot && require.resolve("react-refresh/babel"),
                  ].filter(Boolean),
                },
              },
            ],
          },
        ].filter(Boolean),
      },
      output: {
        path: join(__dirname, "dist", targetType),
        publicPath: `/renderer/`,
        filename: "index.js",
        module: targetType === "renderer",
        chunkFilename: "[id].js",
      },
      resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
        alias: {
          "@babel/runtime": resolve(
            __dirname,
            "node_modules",
            "@babel",
            "runtime",
          ),
          "~root": join(__dirname, "src"),
          "~renderer/pages": join(__dirname, "src", "renderer", "pages"),
          "~renderer/components": join(
            __dirname,
            "src",
            "renderer",
            "components",
          ),
          "~renderer/stores": join(__dirname, "src", "renderer", "stores"),
          "~renderer/types": join(__dirname, "src", "renderer", "types"),
          "~renderer/utils": join(__dirname, "src", "renderer", "utils"),
        },
      },
      experiments: {
        topLevelAwait: true,
        outputModule: targetType === "renderer",
      },
      plugins: [
        new UnusedWebpackPlugin({
          directories: [join(__dirname, "src")],
          exclude: [
            "*.test.ts",
            "*.test.tsx",
            "setupTests.ts",
            indexHTML,
            "types",
          ],
          root: __dirname,
        }),
        targetType === "renderer" &&
          new ScriptExtHtmlWebpackPlugin({
            async: "index.js",
            module: "index.js",
          }),
        new DuplicatePackageCheckerPlugin(),
        targetType === "renderer" &&
          new InterpolateHtmlPlugin({
            PUBLIC_URL: "/static",
          }),
        // new DefinePlugin({
        //   "process.env.DEVELOPMENT": JSON.stringify(mode === "development"),
        //   "process.env.PUBLIC_URL": JSON.stringify("/static"),
        //   "process.env.MODERN": JSON.stringify(targetToModern),
        // }),
        targetType === "renderer" &&
          new ProvidePlugin({
            process: "process/browser",
          }),
        new CleanWebpackPlugin({
          dry: true,
          dangerouslyAllowCleanPatternsOutsideProject: true,
        }),
        // mode !== "development" &&
        //   new BundleAnalyzerPlugin({
        //     openAnalyzer: false,
        //     analyzerMode: "static",
        //     reportFilename: `../../../${
        //       targetToModern ? "modern" : "legacy"
        //     }-analyzer-report.html`,
        //   }),
        targetType === "renderer" &&
          new HtmlWebpackPlugin({
            template: join(__dirname, "src", "static", indexHTML),
            filename: join(__dirname, "dist", "static", indexHTML),
            scriptLoading: "blocking",
            minify: mode !== "development",
            inject: true,
          }),
        new ESLintPlugin({
          extensions: ["ts", "tsx"],
        }),
        targetType === "renderer" &&
          new GenerateSW({
            cleanupOutdatedCaches: true,
            sourcemap: true,
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
              {
                handler: "NetworkFirst",
                urlPattern: /.(?:png|jpg|jpeg|svg|html|js)$/,
              },
            ],
            exclude: [/\.md$/],
            babelPresetEnvTargets: [babelTarget],
            //swDest: `../../sw-${targetToModern ? "modern" : "legacy"}.js`,
          }),
        new CaseSensitivePathsPlugin(),
        targetType === "renderer" &&
          mode === "development" &&
          new HotModuleReplacementPlugin(),
        targetType === "renderer" &&
          mode === "development" &&
          new ReactRefreshWebpackPlugin(),
        new AggressiveMergingPlugin(),
        new MinifyJSONWebpackPlugin(),
      ].filter(Boolean) as unknown as WebpackPluginInstance[],
      devServer:
        targetType === "renderer" && hot
          ? {
              historyApiFallback: true,
              contentBase: join(__dirname, "dist"),
              compress: true,
              hot: true,
              writeToDisk: true,
              port: 5000,
            }
          : undefined,
    } as Configuration;
  };
  return [getConfig("main"), getConfig("preload"), getConfig("renderer")];
};

export default setupConfig;
