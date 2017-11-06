const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require("./webpack.common");

const server = {
    plugins: [new UglifyJSPlugin()]
};

const client = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            url: false //don't handle url() imports to avoid treating font-urls as modules
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            minimize: true
                        }
                    }]
                })
            }
        ]
    }
    , plugins: [new UglifyJSPlugin()]
};

var prod = { server, client };
module.exports = merge.multiple(common, prod);
