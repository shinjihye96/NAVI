import React from 'react';
import 'styles/components/color.scss';

let size = 48;
let fillColor = $Gray900;

export default function camera({ size, fillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0455 7.5C15.0455 6.67157 15.717 6 16.5455 6H31.4545C32.283 6 32.9545 6.67157 32.9545 7.5C32.9545 8.32843 32.283 9 31.4545 9H16.5455C15.717 9 15.0455 8.32843 15.0455 7.5ZM2 21C2 15.7533 6.25329 11.5 11.5 11.5H36.5C41.7467 11.5 46 15.7533 46 21V32.5C46 37.7467 41.7467 42 36.5 42H11.5C6.25329 42 2 37.7467 2 32.5V21ZM11.5 14.5C7.91015 14.5 5 17.4101 5 21V32.5C5 36.0899 7.91015 39 11.5 39H36.5C40.0899 39 43 36.0899 43 32.5V21C43 17.4101 40.0899 14.5 36.5 14.5H11.5ZM24 20.9167C20.6881 20.9167 18.0455 23.5514 18.0455 26.75C18.0455 29.9486 20.6881 32.5833 24 32.5833C27.3119 32.5833 29.9545 29.9486 29.9545 26.75C29.9545 23.5514 27.3119 20.9167 24 20.9167ZM15.0455 26.75C15.0455 21.8484 19.0778 17.9167 24 17.9167C28.9222 17.9167 32.9545 21.8484 32.9545 26.75C32.9545 31.6516 28.9222 35.5833 24 35.5833C19.0778 35.5833 15.0455 31.6516 15.0455 26.75Z" fill={fillColor}/>
            <path d="M39 20.5C39 21.3284 38.3284 22 37.5 22C36.6716 22 36 21.3284 36 20.5C36 19.6716 36.6716 19 37.5 19C38.3284 19 39 19.6716 39 20.5Z" fill={fillColor}/>
        </svg>
    );
}