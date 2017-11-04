const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const server = {
    entry: "./src/server/index.ts",

    output: {
        filename: "index.js",
        path: __dirname + "/dist/server"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    target: "node",

    node: { __dirname: false },

    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(["./dist"]),
        new CopyWebpackPlugin([
            { from: "./package.json" },
            { from: "./yarn.lock" }
        ])
    ]
};

const client = {
    entry: "./src/public/app.tsx",
    output: {
        filename: "app.[chunkhash].js",
        path: __dirname + "/dist/public"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: "app.[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
            inject: "body"
        }),
        new CopyWebpackPlugin([
            {
                from: "./src/public/assets",
                to: "assets"
            },
            { from: "./src/public/manifest.json" }
        ])
    ]

    // // When importing a module whose path matches one of the following, just
    // // assume a corresponding global variable exists and use that instead.
    // // This is important because it allows us to avoid bundling all of our
    // // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};

const common = { server, client };
module.exports = common;