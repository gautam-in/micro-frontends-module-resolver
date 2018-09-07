const baseConfig = require('./shared.base');

const config = {
    ...baseConfig,
    mode: 'development',
    devtool: 'cheap-module-inline-source-map',
    performance: {
        hints: false,
    },
};

module.exports = config;
