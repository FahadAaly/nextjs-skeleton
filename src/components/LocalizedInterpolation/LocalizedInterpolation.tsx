import React from 'react';
import {Trans} from 'root/nexti18nextconfig';

const LocalizedInterpolation: React.FC<LocalizedProps> = ({t = '', arg, components}) => (
    <Trans i18nKey={t} values={arg} components={components} />
);

export {LocalizedInterpolation};
