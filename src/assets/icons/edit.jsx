import React from 'react';

export default function Edit({ size = 48, className, ...props }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.7942 5.61091C33.6463 3.46303 30.1639 3.46303 28.016 5.61091L6.94923 26.6777C5.24258 28.3844 4.2495 30.6766 4.17168 33.0889L4.00292 38.3203C3.90049 41.4957 6.50201 44.0972 9.67739 43.9948L14.9088 43.826C17.3211 43.7482 19.6134 42.7552 21.32 41.0485L42.3868 19.9817C44.5347 17.8338 44.5347 14.3514 42.3868 12.2035L35.7942 5.61091ZM30.1373 7.73223C31.1137 6.75592 32.6966 6.75592 33.6729 7.73223L40.2655 14.3249C41.2418 15.3012 41.2418 16.8841 40.2655 17.8604L19.1987 38.9272C18.031 40.0949 16.4626 40.7744 14.8121 40.8276L9.58067 40.9964C8.13731 41.0429 6.95481 39.8604 7.00137 38.4171L7.17012 33.1857C7.22336 31.5351 7.90284 29.9667 9.07055 28.799L30.1373 7.73223ZM27.4211 41C26.6362 41 26 41.6716 26 42.5C26 43.3284 26.6362 44 27.4211 44H42.5789C43.3638 44 44 43.3284 44 42.5C44 41.6716 43.3638 41 42.5789 41H27.4211Z" fill={className}/>
        </svg>
    );
}