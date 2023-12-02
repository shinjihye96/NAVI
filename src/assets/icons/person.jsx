import React from 'react';
import Colors from 'styles/components/color.scss';

let defaultSize = 48;
let defaultFillColor = Colors.Gray900;

export default function arrow_left({ size = defaultSize, fillColor = defaultFillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 7C19.0294 7 15 11.0294 15 16C15 18.68 16.1695 21.085 18.031 22.7359C18.4189 23.08 18.6016 23.5999 18.5142 24.111C18.4268 24.622 18.0817 25.0517 17.6015 25.2473C11.3866 27.7788 7.00703 33.8839 7.00001 41H41C40.993 33.8839 36.6134 27.7788 30.3985 25.2473C29.9183 25.0517 29.5732 24.622 29.4858 24.111C29.3984 23.5999 29.5811 23.08 29.969 22.7359C31.8305 21.085 33 18.68 33 16C33 11.0294 28.9706 7 24 7ZM12 16C12 9.37258 17.3726 4 24 4C30.6274 4 36 9.37258 36 16C36 18.7828 35.0516 21.3453 33.4627 23.3801C39.7342 26.7595 44 33.393 44 41.0171C44 42.662 42.667 44 41.0185 44H6.98148C5.33305 44 4 42.662 4 41.0171C4 33.393 8.26581 26.7595 14.5373 23.3801C12.9484 21.3453 12 18.7828 12 16Z" fill={`${fillColor}`}/>
        </svg>
    );
}