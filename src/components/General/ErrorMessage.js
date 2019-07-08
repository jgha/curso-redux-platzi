import React from 'react';
import '../../styles/error.css';
import Icon from './Icons';

const ErrorMessage = (props) => {
    return (
        <div className="container">
            <div className="error">
                <Icon name="sad" /> { props.message ? props.message : ' :( '}
            </div>
        </div>
    );
}

export default ErrorMessage;