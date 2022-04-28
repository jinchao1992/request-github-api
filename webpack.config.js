const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    clean: true,
    filename: "[name].[conenthash].js"
  },
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-syntax-top-level-await"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        USER_PRIVATE_GITHUB_TOKEN: `'${process.env.USER_PRIVATE_GITHUB_TOKEN}'`
      }
    })
  ]
}