const { merge } = require("webpack-merge");
const [commonServer, commonClient] = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const server = {
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
};

const client = {
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [merge(commonServer, server), merge(commonClient, client)];
