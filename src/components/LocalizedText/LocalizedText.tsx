import React from 'react';
import {LocalizedInterpolation} from '../LocalizedInterpolation';

const LocalizedText: React.FC<LocalizedProps> = (props) => {
    return (
        <span>
            <LocalizedInterpolation {...props} />
        </span>
    );
};

export {LocalizedText};
