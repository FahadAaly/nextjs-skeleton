export enum SESSION_STORAGE_KEYS {
    language = 'language',
}

export const getSessionStorageItem = (key: SESSION_STORAGE_KEYS): string | null => {
    return typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null;
};

export const setSessionStorageItem = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, value);
    }
};

export const deleteSessionStorageItem = (key: string) => {
    if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
    }
};
