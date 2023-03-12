const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const server = {
  entry: "./src/server/index.ts",

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/server"),
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  target: "node",

  node: { __dirname: false },

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./package.json",
          to: "..",
          transform: (content) => {
            var packageJson = JSON.parse(content.toString());
            packageJson.scripts.start = "node server/index.js";
            packageJson.scripts.build = "";
            packageJson.main = "server/index.js";
            delete packageJson.devDependencies;
            delete packageJson.jest;
            return Buffer.from(JSON.stringify(packageJson));
          },
        },
        {
          from: "./package-lock.json",
          to: "..",
        },
      ],
    }),
  ],
};

const client = {
  entry: "./src/public/index.tsx",
  output: {
    filename: "app.[chunkhash].js",
    path: path.resolve(__dirname, "dist/public"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/public/assets",
          to: "assets",
          noErrorOnMissing: true,
        },
        { from: "./src/public/service-worker.js", noErrorOnMissing: true },
        { from: "./src/public/manifest.json", noErrorOnMissing: true },
        { from: "./src/public/favicon.ico", noErrorOnMissing: true },
      ],
    }),
  ],

  // // When importing a module whose path matches one of the following, just
  // // assume a corresponding global variable exists and use that instead.
  // // This is important because it allows us to avoid bundling all of our
  // // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // }
};

module.exports = [server, client];
