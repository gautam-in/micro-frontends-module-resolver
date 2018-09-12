const path = require("path");
const nodeExternals = require("webpack-node-externals");

const paths = require("../paths");
const { server: serverLoaders } = require("./loaders");
const resolvers = require("./resolvers");
const plugins = require("./plugins");

module.exports = (env, args) => {
  return {
    name: "server",
    target: "node",
    mode: env || process.env.NODE_ENV || "development",
    devtool: "eval-source-map",
    entry: {
      server: [
        "@babel/polyfill",
        path.resolve(__dirname, "../../src/server/index.js")
      ]
    },
    externals: [
      nodeExternals({
        // we still want imported css from external files to be bundled otherwise 3rd party packages
        // which require us to include their own css would not work properly
        whitelist: /\.css$/
      })
    ],
    output: {
      path: paths.serverBuild,
      filename: "server.js"
    },
    resolve: { ...resolvers },
    module: {
      rules: serverLoaders
    },
    plugins: [...plugins.common, ...plugins.server],
    stats: true
  };
};
