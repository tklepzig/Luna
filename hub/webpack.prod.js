const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common");

const server = {
    plugins: [new UglifyJSPlugin()]
};

const client = {
    plugins: [new UglifyJSPlugin()]
};

var prod = { server, client };
module.exports = merge.multiple(common, prod);
