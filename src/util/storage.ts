const getItem = (reducer: string) => {
    if (typeof window != 'undefined') {
        const store = localStorage.getItem('persist:primary');
        if (store) {
            const storeObj = JSON.parse(store);
            return (storeObj[reducer])
                ? JSON.parse(storeObj[reducer])
                : null;
        }
        return null;
    }
    return null;
};

export const storage = {
    getItem,
};
