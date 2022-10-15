const { nextI18NextRewrites } = require('next-i18next/rewrites')
const ESLintPlugin = require('eslint-webpack-plugin');
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const path = require('path')
const local = require('./src/env/local.json');
const dev = require('./src/env/dev.json')
const prod = require('./src/env/prod.json')
const stage = require('./src/env/stage.json')
const {serverRuntimeConfig, publicRuntimeConfig} = require('./src/config/next.runtimeConfig');

const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
    PHASE_PRODUCTION_SERVER,
} = require('next/constants')

module.exports = (phase) => {
    return withSass(withCSS({
        webpack(config) {
            /* Next JS path aliases */
            config.resolve.alias['root'] = path.join(__dirname)
            config.resolve.alias['src'] = path.join(__dirname, 'src')
            config.plugins.push(new ESLintPlugin({
                extensions: ['js', 'ts', 'jsx', 'tsx'],
                emitError: true,
            }))
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            });
            config.module.rules.push({
                test: /\.css$/,
                include: path.join(__dirname, "not_exist_path"), //to correctly load .css files
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true
                        }
                    }
                ]
            })
            return config
        },
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: "[local]___[hash:base64:5]",
        },
        env: (() => {
            const isLocal = phase === PHASE_DEVELOPMENT_SERVER && process.env.MODE === 'local';
            // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
            const isDev = phase === PHASE_DEVELOPMENT_SERVER && process.env.MODE === 'dev';
            // when `next build` or `npm run build` is used
            const isProd =
                 process.env.MODE === 'prod' && (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER);
            // when `next build` or `npm run build` is used
            const isStaging = PHASE_PRODUCTION_SERVER && process.env.MODE === 'stage';
            
            console.log(`isLocal:${isLocal} isDev:${isDev} isProd:${isProd} isStaging:${isStaging}`);
            if (isLocal)
                return { ...local };
            else if (isDev)
                return { ...dev }
            else if (isStaging)
                return { ...stage }
            else if (isProd)
                return { ...prod }

        })(),
        rewrites: async () => nextI18NextRewrites(publicRuntimeConfig.localeSubpaths),
        serverRuntimeConfig,
        publicRuntimeConfig,
    }))
}