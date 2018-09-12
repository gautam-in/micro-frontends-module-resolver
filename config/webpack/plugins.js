const webpack = require("webpack");

const common = [];

const server = [
  new webpack.DefinePlugin({
    __SERVER__: "true",
    __CLIENT__: "false"
  })
];

module.exports = {
  common,
  server
};
