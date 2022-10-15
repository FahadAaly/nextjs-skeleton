const dev = require('../env/dev.json');
const prod = require('../env/prod.json');
const stage = require('../env/stage.json');

const getEnv = (type) => {
    switch (type) {
        case 'dev':
            return {...dev};
        case 'stage':
            return {...stage};
        case 'prod':
            return {...prod};
    }
};

const serverRuntimeConfig = {
    localeSubpaths: {
        'en': 'en',
        'fi-FI': 'fi-FI',
        'en-GB': 'en-GB',
    },
};

const publicRuntimeConfig = {
    localeSubpaths: {
        'en': 'en',
        'fi-FI': 'fi-FI',
        'en-GB': 'en-GB',
    },
    config: getEnv(process.env.APP_ENV) || {...dev},
};

module.exports = {
    serverRuntimeConfig,
    publicRuntimeConfig,
};
