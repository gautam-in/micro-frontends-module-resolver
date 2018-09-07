const baseConfig = require('./shared.base');

const config = {
    ...baseConfig,
    mode: 'production',
    devtool: 'source-map',
};

module.exports = config;
