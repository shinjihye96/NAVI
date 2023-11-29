import React from 'react';
import 'styles/components/color.scss';

let size = 48;
let fillColor = $Gray900;

export default function close({ size, fillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4393 10.4393C11.0251 9.85355 11.9749 9.85355 12.5607 10.4393L24 21.8787L35.4393 10.4393C36.0251 9.85355 36.9749 9.85355 37.5607 10.4393C38.1464 11.0251 38.1464 11.9749 37.5607 12.5607L26.1213 24L37.5607 35.4393C38.1464 36.0251 38.1464 36.9749 37.5607 37.5607C36.9749 38.1464 36.0251 38.1464 35.4393 37.5607L24 26.1213L12.5607 37.5607C11.9749 38.1464 11.0251 38.1464 10.4393 37.5607C9.85355 36.9749 9.85355 36.0251 10.4393 35.4393L21.8787 24L10.4393 12.5607C9.85355 11.9749 9.85355 11.0251 10.4393 10.4393Z" fill={fillColor}/>
        </svg>
    );
}