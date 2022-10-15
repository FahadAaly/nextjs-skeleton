import {NextApiResponse} from 'next';
import {getReasonPhrase, StatusCodes as HttpCodes} from 'http-status-codes';
import {ResponseTypes} from 'src/util/constants';

/* Create a general response creator on top of both success and error responses */

enum StatusCodes {
    SUCCESS = HttpCodes.OK,
    FAILURE = HttpCodes.INTERNAL_SERVER_ERROR
}

const SuccessRange = {
    START: HttpCodes.OK,
    END: HttpCodes.MULTI_STATUS,
};

const responseIsSuccess = (code: number) => {
    return code >= SuccessRange.START && code <= SuccessRange.END;
};

const getMessageByStatusCode = (type: StatusCodes, code?: number) => {
    try {
        if (code) {
            return getReasonPhrase(code);
        }
        else throw type;
    }
    catch (err) {
        return getReasonPhrase(type);
    }
};

const createSuccessResponse = ({code, data, error}: ResponseParams): ResponseObject => {
    return {
        code: code || HttpCodes.OK,
        data: data || {},
        type: ResponseTypes.SUCCESS,
        error: {message: error?.message || getMessageByStatusCode(StatusCodes.SUCCESS, code)},
    };
};

const createErrorResponse = ({code, data, error}: ResponseParams): ResponseObject => {
    return {
        code: code || HttpCodes.INTERNAL_SERVER_ERROR,
        data: data || {},
        type: ResponseTypes.FAILURE,
        error: {message: error?.message || getMessageByStatusCode(StatusCodes.FAILURE, code)},
    };
};

const responseCreator = async (response: Response) => {
    if (responseIsSuccess(response.status)) {
        return createSuccessResponse({code: response.status, data: await response.json()});
    }
    else {
        return createErrorResponse({code: response.status, error: new Error(response.statusText)});
    }
};

const sendResponse = (res: NextApiResponse<ResponseObject>, data: ResponseObject) => {
    res.status(HttpCodes.OK).json(data);
};

export {createSuccessResponse, createErrorResponse, sendResponse, responseCreator};
