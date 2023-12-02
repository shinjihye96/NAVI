import React from 'react';
import Colors from 'styles/components/color.scss';

let defaultSize = 48;
let defaultFillColor = Colors.Gray900;

export default function arrow_left({ size = defaultSize, fillColor = defaultFillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M38 18H18C16.3431 18 15 19.3431 15 21V35C15 36.6569 16.3431 38 18 38H35.5279C36.3041 38 37.0697 38.1807 37.7639 38.5279L41 40.1459V21C41 19.3431 39.6569 18 38 18ZM18 15C14.6863 15 12 17.6863 12 21V35C12 38.3137 14.6863 41 18 41H35.5279C35.8384 41 36.1446 41.0723 36.4223 41.2111L41.1056 43.5528C42.4354 44.2177 44 43.2507 44 41.7639V21C44 17.6863 41.3137 15 38 15H18Z" fill={`${fillColor}`}/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 11.5C4 7.35786 7.35786 4 11.5 4H32.1939C35.9528 4 39 7.04721 39 10.8061C39 11.6345 38.3284 12.3061 37.5 12.3061C36.6716 12.3061 36 11.6345 36 10.8061C36 8.70406 34.2959 7 32.1939 7H11.5C9.01472 7 7 9.01472 7 11.5V29.4683C7 29.7619 7.23807 30 7.53175 30C8.36017 30 9.03175 30.6716 9.03175 31.5C9.03175 32.3284 8.36017 33 7.53175 33C5.58122 33 4 31.4188 4 29.4683V11.5Z" fill={`${fillColor}`}/>
            <path d="M26 28.5C26 29.3284 25.3284 30 24.5 30C23.6716 30 23 29.3284 23 28.5C23 27.6716 23.6716 27 24.5 27C25.3284 27 26 27.6716 26 28.5Z" fill={`${fillColor}`}/>
            <path d="M33 28.5C33 29.3284 32.3284 30 31.5 30C30.6716 30 30 29.3284 30 28.5C30 27.6716 30.6716 27 31.5 27C32.3284 27 33 27.6716 33 28.5Z" fill={`${fillColor}`}/>
        </svg>
    );
}