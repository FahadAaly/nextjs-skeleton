import React from 'react';
import {useTranslation} from 'nexti18nextconfig';
import {LocalizedText} from '../LocalizedText';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & LocalizedProps;

export const LocalizedExternalLink: React.FC<Props> = ({href, t, children, ...props}) => {
    const {t: translate} = useTranslation();
    return (
        <a href={translate(href || '#!')} target="_blank" rel="noreferrer" {...props}>
            {children}
            {t && <LocalizedText t={t} />}
        </a>
    );
};
