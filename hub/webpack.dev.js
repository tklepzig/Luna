const merge = require("webpack-merge");
const common = require("./webpack.common");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const server = {
    devtool: "inline-source-map"
};

const client = {
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }
        ]
    },
};
var dev = { server, client };

module.exports = merge.multiple(common, dev)

