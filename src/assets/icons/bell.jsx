import React from 'react';
import Colors from 'styles/components/color.scss';

let defaultSize = 48;
let defaultFillColor = Colors.Gray900;

export default function arrow_left({ size = defaultSize, fillColor = defaultFillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C24.8284 4 25.5 4.67157 25.5 5.5V8.69724C33.2875 9.45123 39.375 16.0147 39.375 24V34.525H42.5C43.3284 34.525 44 35.1966 44 36.025C44 36.8534 43.3284 37.525 42.5 37.525H5.5C4.67157 37.525 4 36.8534 4 36.025C4 35.1966 4.67157 34.525 5.5 34.525H8.625V24C8.625 16.0147 14.7126 9.45123 22.5 8.69724V5.5C22.5 4.67157 23.1716 4 24 4ZM11.625 34.525H36.375V24C36.375 17.1655 30.8345 11.625 24 11.625C17.1655 11.625 11.625 17.1655 11.625 24V34.525ZM15.5625 42.5C15.5625 41.6716 16.2341 41 17.0625 41H30.9375C31.7659 41 32.4375 41.6716 32.4375 42.5C32.4375 43.3284 31.7659 44 30.9375 44H17.0625C16.2341 44 15.5625 43.3284 15.5625 42.5Z" fill={`${fillColor}`}/>
        </svg>
    );
}