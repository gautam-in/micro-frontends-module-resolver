const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader"
};

const cssLoaderServer = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "css-loader/locals"
    }
  ]
};

// Server build needs a loader to handle external .css files
const externalCssLoaderServer = {
  test: /\.css$/,
  include: /node_modules/,
  loader: "css-loader/locals"
};

const server = [
  {
    oneOf: [babelLoader, cssLoaderServer, externalCssLoaderServer]
  }
];

module.exports = {
  server
};
