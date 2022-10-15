import {i18n} from 'root/nexti18nextconfig';
import {DEFAULT_LANGUAGE} from 'src/util/constants';
import {setSessionStorageItem, SESSION_STORAGE_KEYS} from './session-storage';

const changeLanguage = async (lang = DEFAULT_LANGUAGE): Promise<string> => {
    try {
        await i18n.changeLanguage(lang);
        setSessionStorageItem(SESSION_STORAGE_KEYS.language, lang);
        return i18n.language;
    }
    catch (e) {
        return i18n.language;
    }
};

export {changeLanguage};
