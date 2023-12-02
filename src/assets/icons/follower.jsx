import React from 'react';
import Colors from 'styles/components/color.scss';

let defaultSize = 48;
let defaultFillColor = Colors.Gray900;

export default function arrow_left({ size = defaultSize, fillColor = defaultFillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.625 7C24.8557 7 21.8 10.0557 21.8 13.825C21.8 16.2223 23.0348 18.3321 24.9102 19.5516C25.6047 20.0033 25.8016 20.9324 25.35 21.6269C24.8983 22.3214 23.9692 22.5183 23.2747 22.0666C20.5844 20.3171 18.8 17.2798 18.8 13.825C18.8 8.3988 23.1988 4 28.625 4C34.0512 4 38.45 8.3988 38.45 13.825C38.45 16.314 37.5239 18.5862 36 20.3164C40.7421 22.6858 44 27.586 44 33.25C44 34.0784 43.3284 34.75 42.5 34.75C41.6716 34.75 41 34.0784 41 33.25C41 28.0355 37.513 23.6315 32.7404 22.25C32.1768 22.0868 31.76 21.6099 31.6738 21.0295C31.5876 20.449 31.8478 19.8716 32.3398 19.5516C34.2152 18.3321 35.45 16.2223 35.45 13.825C35.45 10.0557 32.3943 7 28.625 7ZM18.45 25.5C16.2132 25.5 14.4 27.3132 14.4 29.55V32.9H11.05C8.81325 32.9 7 34.7132 7 36.95C7 39.1868 8.81325 41 11.05 41H22.5V29.55C22.5 27.3132 20.6868 25.5 18.45 25.5ZM25.5 41V29.55C25.5 25.6564 22.3436 22.5 18.45 22.5C14.5564 22.5 11.4 25.6564 11.4 29.55V29.9H11.05C7.15639 29.9 4 33.0564 4 36.95C4 40.8436 7.15639 44 11.05 44H27.7C28.5284 44 29.2 43.3284 29.2 42.5C29.2 41.6716 28.5284 41 27.7 41H25.5Z" fill={`${fillColor}`}/>
            <path d="M35 42.5C35 43.3284 34.3284 44 33.5 44C32.6716 44 32 43.3284 32 42.5C32 41.6716 32.6716 41 33.5 41C34.3284 41 35 41.6716 35 42.5Z" fill={`${fillColor}`}/>
        </svg>
    );
}