import {NextApiRequest, NextApiResponse} from 'next';
import NextAuth, {Callbacks, InitOptions, User} from 'next-auth';
import Providers from 'next-auth/providers';
import {GenericObject, SessionBase} from 'next-auth/_utils';
import {getLanguageCode, getLangFromUrl} from 'src/util/common';
import {request} from 'src/util/request';

interface ICallBack extends Callbacks {
    jwt?(token: GenericObject, user: User & UserResponse): Promise<GenericObject>;
    session?(
        session: SessionBase,
        token: User & {
            user: User & UserResponse;
            accessToken: string;
        },
    ): Promise<GenericObject>;
}

const MAX_SESSION_AGE = 60 * 60; // 60 min

const callbacks: ICallBack = {
    async jwt(token, response) {
        if (response?.token || token?.accessToken) {
            const lang = response?.serviceLanguage || token.user?.serviceLanguage;
            const userData = await request<null, UserResponse>({
                path: `${lang}/me`, //add language when availbale from api
                method: 'get',
                isServer: true,
                token: response?.token || token?.accessToken,
            });

            if (userData.success) {
                const data = userData.success.data;
                token.accessToken = response?.token || token?.accessToken;
                token.user = {
                    id: data.profile.id,
                    firstName: data.profile.firstName,
                    lastName: data.profile.lastName,
                    email: data.profile.email,
                    phone: data.profile.phone,
                    status: data.profile.status,
                    profileImage: data.profile.profileImage,
                    serviceLanguage: data.profile.serviceLanguage,
                };
            }
        }

        return token; //forwarded to callbacks session()
    },

    async session(session, token) {
        if (token?.user && token?.accessToken) {
            session.accessToken = token.accessToken;
            session.user = token.user;
        }
        return session; //session is now availble on both Client's useSession() and Server's getSession()
    },
};

const providers = [
    Providers.Credentials({
        name: 'Credentials',
        credentials: {},
        authorize: async (credentials) => {
            // Called from LoginContainer's singIn() of next-auth
            const lang = getLanguageCode(getLangFromUrl(credentials.callbackUrl));
            const response = await request<Record<string, string>, UserResponse | AnyObject>({
                path: `${lang}/login`,
                method: 'post',
                data: credentials,
                isServer: true,
            });

            if (response.success) {
                return response.success.data; //forwarded to callbacks jwt()
            }
            return null;
        },
    }),
];

const options: InitOptions = {
    providers,
    callbacks,
    session: {
        maxAge: MAX_SESSION_AGE,
    },
    jwt: {
        maxAge: MAX_SESSION_AGE,
    },
    debug: true,
    pages: {
        error: '/login',
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
