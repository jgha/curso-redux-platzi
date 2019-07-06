import React from 'react';
import '../../styles/spinner.css';

const Spinner = (props) => {
    
    if(props.name==='ring'){
        return (
            <div className="container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
}

export default Spinner;