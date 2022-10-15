import {NextApiRequest, NextApiResponse} from 'next';
import {ResponseTypes} from 'src/util/constants';
import {outputToConsole} from 'src/util/common';

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseObject>) => {
    outputToConsole(req.url);
    res.status(200).json({
        code: 200,
        data: {message: 'hello ' + req.query.user},
        type: ResponseTypes.SUCCESS,
        error: null,
    });
};

export default handler;
