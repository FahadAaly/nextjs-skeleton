import React from 'react';
import {connect} from 'react-redux';

const AppComponent = ({custom}: {custom?: string}): JSX.Element => {
    return (
        <div className="container">
            <h3>App Component</h3>
            <h6>Custom Props: {custom}</h6>
        </div>
    );
};

export default connect(state => state)(AppComponent);
