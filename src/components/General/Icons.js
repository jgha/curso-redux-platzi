import React from 'react';
import '../../styles/icons.css';

const Icon = (props) => {

    switch (props.name) {
        case 'eye':
            return <div className="eye-solid icon"></div>;
        case 'sad':
            return <div className="sad icon"><i></i></div>;  
        default:
            return <div></div>
    }
    
    
}

export default Icon;