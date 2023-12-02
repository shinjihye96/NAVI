import React from 'react';
import Colors from 'styles/components/color.scss';

let defaultSize = 48;
let defaultFillColor = Colors.Gray900;

export default function arrow_left({ size = defaultSize, fillColor = defaultFillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 9.5C4 6.46243 6.46243 4 9.5 4H27.5C30.5376 4 33 6.46243 33 9.5V20.5C33 21.3284 32.3284 22 31.5 22C30.6716 22 30 21.3284 30 20.5V9.5C30 8.11929 28.8807 7 27.5 7H9.5C8.11929 7 7 8.11929 7 9.5V38.5C7 39.8807 8.11929 41 9.5 41H18C18.8284 41 19.5 41.6716 19.5 42.5C19.5 43.3284 18.8284 44 18 44H9.5C6.46243 44 4 41.5376 4 38.5V9.5ZM13 14.75C13 13.9216 13.6716 13.25 14.5 13.25H22.5C23.3284 13.25 24 13.9216 24 14.75C24 15.5784 23.3284 16.25 22.5 16.25H14.5C13.6716 16.25 13 15.5784 13 14.75ZM38.6456 24.4153C38.4492 24.2131 38.1246 24.2131 37.9282 24.4153L26.6734 36.0045C26.3544 36.333 26.1317 36.7428 26.0297 37.1893L25.4596 39.684C25.3769 40.046 25.7038 40.3687 26.0648 40.2813L28.344 39.729C28.8025 39.618 29.2202 39.3795 29.5488 39.041L40.8608 27.393C41.0492 27.199 41.0492 26.8903 40.8608 26.6963L38.6456 24.4153ZM35.776 22.3252C37.1507 20.9098 39.4231 20.9098 40.7977 22.3252L43.0129 24.6063C44.3318 25.9643 44.3318 28.125 43.0129 29.483L31.701 41.1311C30.978 41.8756 30.0591 42.4003 29.0505 42.6447L26.7712 43.1969C24.2445 43.8091 21.9559 41.5502 22.535 39.0157L23.1051 36.521C23.3295 35.5388 23.8194 34.6372 24.5213 33.9144L35.776 22.3252Z" fill={`${fillColor}`}/>
        </svg>
    );
}