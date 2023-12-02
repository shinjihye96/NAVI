import React from 'react';
import Colors from 'styles/components/color.scss';

let defaultSize = 48;
let defaultFillColor = Colors.Gray900;

export default function arrow_left({ size = defaultSize, fillColor = defaultFillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM19.5107 17.3893C18.9249 16.8036 17.9751 16.8036 17.3894 17.3893C16.8036 17.9751 16.8036 18.9249 17.3894 19.5107L21.8787 24L17.3894 28.4893C16.8036 29.0751 16.8036 30.0249 17.3894 30.6107C17.9751 31.1964 18.9249 31.1964 19.5107 30.6107L24 26.1213L28.4894 30.6107C29.0751 31.1964 30.0249 31.1964 30.6107 30.6107C31.1965 30.0249 31.1965 29.0751 30.6107 28.4893L26.1213 24L30.6107 19.5107C31.1965 18.9249 31.1965 17.9751 30.6107 17.3893C30.0249 16.8036 29.0751 16.8036 28.4894 17.3893L24 21.8787L19.5107 17.3893Z" fill={`${fillColor}`}/>
        </svg>
    );
}