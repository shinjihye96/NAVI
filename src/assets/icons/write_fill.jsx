import React from 'react';
import { Colors } from '../../styles/color';

let size = 48;
let fillColor = 'Colors.Gray900';

export default function write_fill({ size, fillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 10V38C4 41.3137 6.68629 44 10 44H15.9448C17.7486 44 19.3293 42.7927 19.8039 41.0525L21.5995 34.4686C21.8623 33.5048 22.3617 32.6219 23.0522 31.9L31.8906 22.6599C32.6026 21.9155 33 20.9251 33 19.895V10C33 6.68629 30.3137 4 27 4H10C6.68629 4 4 6.68629 4 10ZM14.5 13.25C13.6716 13.25 13 13.9216 13 14.75C13 15.5784 13.6716 16.25 14.5 16.25H22.5C23.3284 16.25 24 15.5784 24 14.75C24 13.9216 23.3284 13.25 22.5 13.25H14.5Z" fill={fillColor}/>
            <path d="M25.0474 35.1379C24.5384 35.663 24.1831 36.3177 24.0202 37.0307L23.2198 40.5332C22.8889 41.9815 24.1967 43.2723 25.6405 42.9225L28.8944 42.1341C29.6292 41.9561 30.2985 41.5734 30.8248 41.0305L43.1496 28.3142C43.9019 27.5379 43.9013 26.3044 43.1482 25.5289L40.1862 22.4789C39.4001 21.6695 38.1005 21.6701 37.3153 22.4803L25.0474 35.1379Z" fill={fillColor}/>
        </svg>
    );
}