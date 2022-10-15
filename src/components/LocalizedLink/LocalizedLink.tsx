import React from 'react';
import {Link} from 'nexti18nextconfig';
import {LinkProps} from 'next/link';
import {useTranslation} from 'nexti18nextconfig';
import {LocalizedText} from '../LocalizedText';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement>, LocalizedProps, Omit<LinkProps, 'href'> {}
export const LocalizedLink: React.FC<Props> = ({href, t, arg, components, children, ...props}) => {
    const {t: translate} = useTranslation();
    return (
        <Link href={translate(href || '#!')} {...props}>
            <a {...props}>
                {children}
                {<LocalizedText t={t} arg={arg} components={components} />}
            </a>
        </Link>
    );
};
