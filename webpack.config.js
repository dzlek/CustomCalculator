const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    mode: isDev ? "development" : "production",
    devtool: isDev ? "inline-source-map" : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: isDev
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            },
      }),
    ],
    devServer: isDev
      ? {
          static: "./dist",
          open: true,
          port: 3000,
          hot: true,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
  };
};
