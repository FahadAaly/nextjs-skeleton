import {AxiosRequestConfig} from 'axios';

declare global{
    declare interface RequestParams {
        url: string;
        path: string;
        method: string;
        params?: string;
        body?: BodyInit;
    }

    declare interface ResponseObject {
        code: number;
        data: unknown;
        type: string;
        error: null | {message: string};
    }

    type FetchOptions = RequestInit;

    declare type ResponseParams = Partial<ResponseObject>;

    interface SuccessResponse<T = AnyObject> {
        success: ResponseShape<T>;
        error: null;
    }

    interface ErrorResponse<T = AnyObject> {
        error: ResponseShape<T>;
        success?: null;
    }

    type ApiResponse<T = AnyObject> = SuccessResponse<T> | ErrorResponse<T>;

    type AnyObject = Record<string, unknown>;

    interface ApiRequest<T = AnyObject> extends AxiosRequestConfig {
        path?: string;
        data?: T;
        headers?: headers;
        isServer?: boolean;
        token?: string;
        params?: AnyObject;
    }

    interface ServerSideRequest extends IncomingMessage {
        lng: string;
    }

    type ServerSideApiRequest<T> = ApiRequest<T> & {req: IncomingMessage};
}

