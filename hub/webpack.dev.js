const { merge } = require("webpack-merge");
const [commonServer, commonClient] = require("./webpack.common");

const server = {
  mode: "development",
  devtool: "inline-source-map",
};

const client = {
  mode: "development",
  devtool: "inline-source-map",
};

module.exports = [merge(commonServer, server), merge(commonClient, client)];
