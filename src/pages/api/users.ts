import {NextApiRequest, NextApiResponse} from 'next';
import {createErrorResponse, sendResponse} from 'src/util/response';
import {request} from 'src/util/request';
import {HTTP_METHODS} from 'src/util/constants';
import {StatusCodes} from 'http-status-codes';
import {API_ROUTES} from 'src/util/api-routes';
import {outputToConsole} from 'src/util/common';
import {Method} from 'axios';

const getHandler = async (res: NextApiResponse<ResponseObject>) => {
    try {
        const responseData = await request({
            url: 'https://jsonplaceholder.typicode.com/',
            path: API_ROUTES.USERS,
            method: HTTP_METHODS.GET as Method,
        });
        sendResponse(res, responseData as ResponseObject);
    } catch (err) {
        const responseData = createErrorResponse({code: StatusCodes.NOT_FOUND, error: err});
        sendResponse(res, responseData);
    }
};

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseObject>) => {
    outputToConsole(req.url);
    if (req.method == HTTP_METHODS.GET) {
        getHandler(res);
        return;
    }
    res.end();
};

export default handler;
