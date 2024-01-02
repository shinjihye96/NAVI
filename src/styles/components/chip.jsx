import React from 'react';
import './chip.scss';
export default function Chips({icon, text, className = '', onclick, ...props}) {
    const isOnclick = onclick;

    if(isOnclick) {
        return (
            <button className={`chip ${className}`} onClick={onclick} {...props}>
            <img src={`${icon}`} className='icon' alt='chip' />
            {text !=undefined && <p className='txt'>{text}</p>}
        </button>
        );
    }
    return(
        <div className={`chip ${className}`} {...props}>
            <img src={`${icon}`} className='icon' alt='chip_icon' />
            {text !=undefined && <p className='txt'>{text}</p>}
        </div>
    );
}