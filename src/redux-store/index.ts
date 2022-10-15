import {configureStore} from '@reduxjs/toolkit';
import {useStore} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import {createWrapper} from 'next-redux-wrapper';
import {rootReducer} from './root-reducer';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';

const initStore = (): AppStore => {
    let store: AppStore;

    const isClient = typeof window !== 'undefined';

    if (isClient) {
        const persistConfig = {
            key: 'primary',
            storage,
            whitelist: [],
        };
        // @ts-expect-error: for required property "persistor", which we attach in the immediate next line
        store = configureStore({
            reducer: persistReducer(persistConfig, rootReducer),
            preloadedState: undefined,
            devTools: process.env.NODE_ENV !== 'production',
            middleware: [thunkMiddleware],
        });
        store.persistor = persistStore(store);
    } else {
        // @ts-expect-error: for required property "persistor", we do not need persistor on server
        store = configureStore({
            reducer: rootReducer,
            preloadedState: undefined,
            devTools: process.env.NODE_ENV !== 'production',
        });
    }
    return store;
};

export const reduxWrapper = createWrapper<RootState>(initStore);

// @ts-expect-error: for missing property persistor, we know we have it on client, and don't need it on server
export const useAppStore = (): AppStore => useStore<RootState>();
