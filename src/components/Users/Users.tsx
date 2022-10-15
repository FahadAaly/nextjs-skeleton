import React from 'react';
import Layout from 'src/components/Layout';
import {h1} from './Users.style';
import {LocalizedText} from 'src/components/LocalizedText';
import {runTimeConfig} from 'src/util/common';

interface OwnProps {
    toggleLanguage: () => void;
}

const UsersComponent = ({toggleLanguage}: OwnProps): JSX.Element => {
    return (
        <Layout title="Home">
            <div>
                <LocalizedText t="USERS.TEXT.HELLOWORLD" />
                <button data-testid="change language" type="button" onClick={toggleLanguage}>
                    <LocalizedText t="USERS.BUTTON.CHANGELANGUAGE" />
                </button>
                <h1>
                    <LocalizedText t="USERS.TEXT.ENVIRONMENTIS" />
                    <LocalizedText t={runTimeConfig().ENV} />
                </h1>
                <style jsx>{h1}</style>
            </div>
        </Layout>
    );
};

export {UsersComponent};
