const HtmlWebpackPlugin = require("html-webpack-plugin")
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
    })
  ]
}