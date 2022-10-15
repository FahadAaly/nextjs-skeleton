import {getSession} from 'next-auth/client';
import axios, {AxiosResponse, Method} from 'axios';
import queryString from 'query-string';
import {COMMON_HEADERS} from 'src/util/constants';
import {getLanguageCode, runTimeConfig} from 'src/util/common';
import {i18n} from 'root/nexti18nextconfig';

const getBaseUrl = (): string => {
    const BASE_API = runTimeConfig().BASE_API;
    return `${BASE_API}`;
};

const getParams = (params?: AnyObject) => {
    if (!params) return '';
    const parsedParams = queryString.stringify(params);
    return `?${parsedParams}`;
};

const getLang = () => {
    return getLanguageCode(i18n.language);
};

const getUrl = <T>(args: ApiRequest<T>) => {
    const {path, isServer} = args;
    const url = isServer ? `${getBaseUrl()}/api/${path}` : `/api/${getLang()}/${path}`;
    return url;
};

const createOptions = async <T>(method: Method = 'GET', isServer?: boolean, data?: T, token?: string) => {
    const options: ApiRequest<T> = {
        method,
        headers: {...COMMON_HEADERS},
    };
    if (data) options.data = data;
    if (options.headers) {
        if (token && isServer) {
            options.headers.authorization = `Bearer ${token}`;
        } else {
            const session = await getSession();
            if (session?.accessToken) options.headers.token = session.accessToken;
        }
    }
    return options;
};

const request = async <T, R = AnyObject>(args: ApiRequest<T>): Promise<ApiResponse<R>> => {
    try {
        const {method, params, data, token, isServer} = args;
        const url = `${getUrl<T>(args)}${getParams(params)}`;
        const options = await createOptions(method, isServer, data, token);
        const response: AxiosResponse<ApiResponse> = await axios({...options, url});
        return response.data as ApiResponse<R>;
    } catch (error) {
        return {
            error: {
                code: 500,
                message: 'RESPONSE.DEFAULT.ERROR',
                data: {message: error.message, name: error.name} as unknown,
            },
        } as ApiResponse<R>;
    }
};

export {request};
