import React from 'react';
import './chip.scss';
export default function Chips({icon, name, onclick, ...props}) {
    const isOnclick = onclick;

    if(isOnclick) {
        return (
            <button className="chip" onClick={onclick} {...props}>
            <img src={`${icon}`} className='icon' alt='chip' />
            {name && <p className='txt'>{name}</p>}
        </button>
        );
    }
    return(
        <div className="chip" {...props}>
            <img src={`${icon}`} className='icon' alt='chip_icon' />
            {name && <p className='txt'>{name}</p>}
        </div>
    );
}