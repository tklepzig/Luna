const merge = require("webpack-merge");
const common = require("./webpack.common");

const server = {
    devtool: "inline-source-map"
};

const client = {
    devtool: "inline-source-map"
};
var dev = { server, client };

module.exports = merge.multiple(common, dev)

