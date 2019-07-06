import React from 'react';
import '../../styles/error.css';

const ErrorMessage = (props) => {
    return (
        <div className="container">
            <div className="error">
                Error: <stron>{ props.message ? props.message : ' :( '} </stron>
            </div>
        </div>
    );
}

export default ErrorMessage;