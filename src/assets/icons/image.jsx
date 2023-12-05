import React from 'react';

export default function Image({ size = 48, className, ...props }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.00011 13.5C4.00011 8.25329 8.25341 4 13.5001 4H34.5C39.7467 4 44 8.25329 44 13.5V34.5C44 39.7467 39.7467 44 34.5 44H13.5001C8.25341 44 4.00011 39.7467 4.00011 34.5V25.8685C4.00004 25.8623 4 25.8561 4 25.8499C4 25.8437 4.00004 25.8375 4.00011 25.8313V13.5ZM7.00011 27.4232V34.5C7.00011 38.0899 9.91026 41 13.5001 41H17.0509C16.9841 40.2753 16.95 39.5415 16.95 38.8C16.95 36.9275 17.1675 35.104 17.5791 33.3541C15.0947 30.0783 11.3125 27.8469 7.00011 27.4232ZM18.6444 29.9842C15.6625 26.8537 11.5713 24.7852 7.00011 24.4111V13.5C7.00011 9.91015 9.91026 7 13.5001 7H34.5C38.0899 7 41 9.91015 41 13.5V15.1026C40.8835 15.1009 40.7668 15.1 40.6499 15.1C30.6749 15.1 22.1421 21.2614 18.6444 29.9842ZM41 18.1029C40.8836 18.101 40.7669 18.1 40.6499 18.1C31.0769 18.1 23.0182 24.5997 20.6532 33.4294C20.1948 35.1405 19.95 36.9405 19.95 38.8C19.95 39.5436 19.9892 40.2775 20.0654 41H34.5C38.0898 41 41 38.0898 41 34.5V18.1029Z" fill={className}/>
            <path d="M18 16.5C18 17.3284 17.3284 18 16.5 18C15.6716 18 15 17.3284 15 16.5C15 15.6716 15.6716 15 16.5 15C17.3284 15 18 15.6716 18 16.5Z" fill={className}/>
        </svg>
    );
}