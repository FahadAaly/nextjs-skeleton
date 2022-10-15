/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Locale} from 'date-fns';
import en from 'date-fns/locale/en-GB';
import {fi} from 'date-fns/locale';
import {getSession} from 'next-auth/client';
import getConfig from 'next/config';
import {i18n} from 'root/nexti18nextconfig';
import {useTranslation} from 'react-i18next';

export const outputToConsole = (message: unknown, defaultValue?: string) => {
    if (process.env.ENV == 'development')
        console.log(
            '\x1b[33m%s\x1b[0m', //custom colored logs
            defaultValue?.toUpperCase() || 'PRINT',
            ':::' + JSON.stringify(message),
        );
};

export const runTimeConfig = () => {
    const config = getConfig();
    return config.publicRuntimeConfig.config;
};

export const getLanguageCode = (lang?: string) => {
    const language = lang || i18n.language;
    return language.split('-')[0];
};

export const getLangFromUrl = (url: string) => {
    return url.split('/')[3];
};

export const getLanguage = (lang: string) => {
    const languages: Record<string, Locale> = {
        'en-GB': en,
        'fi-FI': fi,
    };
    return languages[lang];
};

export const getServerSideRequest = async <T = AnyObject>(args: ServerSideApiRequest<T>) => {
    const {req, path, method, data, params} = args;
    const session = await getSession({req});
    const {lng} = (req as unknown) as ServerSideRequest;
    const languageCode = getLanguageCode(lng);
    const request: ApiRequest<T> = {
        path: `${languageCode}/${path}`,
        method,
        isServer: true,
        token: session?.accessToken,
    };
    if (params) request.params = params;
    if (data) request.data = data;
    return request;
};

export const urlConverter = (type: 'email' | 'phoneNumber', url: string) => {
    switch (type) {
        case 'email':
            return `mailto:${url}`;
        case 'phoneNumber':
            return `tel:${url}`;
        default:
            return `${url}`;
    }
};

export const getCurrentLanguage = () => {
    const {
        i18n: {language},
    } = useTranslation();
    return language;
};
