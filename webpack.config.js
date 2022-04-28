const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    clean: true,
    filename: "[name].[conenthash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body"
    })
  ]
}