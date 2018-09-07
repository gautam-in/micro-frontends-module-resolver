const path = require('path');
const paths = require('../paths');
const { client: clientLoaders } = require('./loaders');
const resolvers = require('./resolvers');
const nodeExternals = require('webpack-node-externals');
const plugins = require('./plugins');

module.exports = {
    name: 'client',
    target: 'node',
    externals: [
        nodeExternals({
            // we still want imported css from external files to be bundled otherwise 3rd party packages
            // which require us to include their own css would not work properly
            whitelist: /\.css$/,
        }),
    ],
    entry: {
        home: path.resolve(__dirname, '../../src/shared/modules/Home/Home.js'),
    },
    plugins: [...plugins.shared],
    output: {
        path: path.join(paths.sharedBuild),
        filename: '[name].js',
        library: 'home',
        libraryTarget: 'umd',
    },
    module: {
        rules: clientLoaders,
    },
    resolve: { ...resolvers },
    optimization: {
        namedModules: true,
        noEmitOnErrors: true,
        // concatenateModules: true,
    },
    stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        timings: true,
        version: false,
    },
};
