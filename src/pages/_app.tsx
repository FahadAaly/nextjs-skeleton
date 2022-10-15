import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
import {AppProps} from 'next/app';
import {reduxWrapper, useAppStore} from 'src/redux-store';
import {appWithTranslation} from 'root/nexti18nextconfig';
import {PersistGate} from 'redux-persist/integration/react';
import {getSessionStorageItem, SESSION_STORAGE_KEYS} from 'src/util/session-storage';
import {changeLanguage} from 'src/util/language';

interface OwnProps extends AppProps {
    store: AppStore;
    ctx: NextPageContext;
}

const MyApp = ({Component, pageProps}: OwnProps) => {
    const store = useAppStore();
    const updateLanguage = () => {
        const savedLanguage = getSessionStorageItem(SESSION_STORAGE_KEYS.language);
        savedLanguage ? changeLanguage(savedLanguage) : changeLanguage();
    };

    useEffect(() => {
        updateLanguage();
    }, []);

    return (
        <PersistGate persistor={store.persistor} loading={null}>
            <Component {...pageProps} />
        </PersistGate>
    );
};

MyApp.getInitialProps = async ({Component, ctx}: OwnProps) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    if (!pageProps.namespacesRequired) {
        pageProps.namespacesRequired = ['common'];
    }
    return {pageProps};
};

export default reduxWrapper.withRedux(appWithTranslation(MyApp));
