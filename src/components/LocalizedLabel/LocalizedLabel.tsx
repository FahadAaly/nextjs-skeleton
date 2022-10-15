import React from 'react';
import {LocalizedText} from '../LocalizedText';

interface Props extends LocalizedProps {
    className?: string;
}

export const LocalizedLabel: React.FC<Props> = ({className, ...props}) => {
    return (
        <label className={className}>
            <LocalizedText {...props} />
        </label>
    );
};
