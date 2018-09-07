module.exports = (env = 'production') => {
    if (env === 'development' || env === 'dev') {
        process.env.NODE_ENV = 'development';
        return [require('./client.dev'), require('./server.dev'), require('./shared.dev')];
    }
    process.env.NODE_ENV = 'production';
    return [require('./client.prod'), require('./server.prod'), require('./shared.prod')];
};
