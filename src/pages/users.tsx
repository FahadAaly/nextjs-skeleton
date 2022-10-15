import React from 'react';
import {UsersComponent} from 'src/components/Users';
import {changeLanguage} from 'src/util/language';

interface StateProps extends WithDispatch {
    language: string;
}

type OwnProps = StateProps;

const Users = ({language}: OwnProps): JSX.Element => {
    const _toggleLanguage = async (): Promise<void> => {
        const lang = await changeLanguage(language == 'fi' ? 'en-gb' : 'fi');
        console.log(lang);
    };
    return <UsersComponent toggleLanguage={_toggleLanguage} />;
};

export default Users;
