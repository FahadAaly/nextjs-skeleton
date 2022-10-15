import NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import path from 'path';

const config = getConfig();

const nextI18n = new NextI18Next({
    defaultLanguage: 'fi-FI',
    otherLanguages: ['en-GB'],
    fallbackLng: 'en',
    shallowRender: true,
    browserLanguageDetection: false,
    localeSubpaths: config.publicRuntimeConfig.localeSubpaths,
    localePath: path.resolve('./public/static/locales'),
    serverLanguageDetection: false,
});

export default nextI18n;
export const {appWithTranslation, i18n, Link, withTranslation, useTranslation, Trans} = nextI18n;
