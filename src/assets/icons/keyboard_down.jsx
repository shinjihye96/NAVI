import React from 'react';

export default function KeyboardDown({ size = 48, className, ...props }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M38 9H10C8.34315 9 7 10.3431 7 12V29C7 30.6569 8.34315 32 10 32H38C39.6569 32 41 30.6569 41 29V12C41 10.3431 39.6569 9 38 9ZM10 6C6.68629 6 4 8.68629 4 12V29C4 32.3137 6.68629 35 10 35H38C41.3137 35 44 32.3137 44 29V12C44 8.68629 41.3137 6 38 6H10Z" fill={className}/>
            <path d="M12 16.5C12 15.6716 12.6716 15 13.5 15C14.3284 15 15 15.6716 15 16.5C15 17.3284 14.3284 18 13.5 18C12.6716 18 12 17.3284 12 16.5Z" fill={className}/>
            <path d="M12 24.5C12 23.6716 12.6716 23 13.5 23C14.3284 23 15 23.6716 15 24.5C15 25.3284 14.3284 26 13.5 26C12.6716 26 12 25.3284 12 24.5Z" fill={className}/>
            <path d="M19 16.5C19 15.6716 19.6716 15 20.5 15C21.3284 15 22 15.6716 22 16.5C22 17.3284 21.3284 18 20.5 18C19.6716 18 19 17.3284 19 16.5Z" fill={className}/>
            <path d="M19 24.5C19 23.6716 19.6716 23 20.5 23H27.5C28.3284 23 29 23.6716 29 24.5C29 25.3284 28.3284 26 27.5 26H20.5C19.6716 26 19 25.3284 19 24.5Z" fill={className}/>
            <path d="M26 16.5C26 15.6716 26.6716 15 27.5 15C28.3284 15 29 15.6716 29 16.5C29 17.3284 28.3284 18 27.5 18C26.6716 18 26 17.3284 26 16.5Z" fill={className}/>
            <path d="M33 16.5C33 15.6716 33.6716 15 34.5 15C35.3284 15 36 15.6716 36 16.5C36 17.3284 35.3284 18 34.5 18C33.6716 18 33 17.3284 33 16.5Z" fill={className}/>
            <path d="M33 24.5C33 23.6716 33.6716 23 34.5 23C35.3284 23 36 23.6716 36 24.5C36 25.3284 35.3284 26 34.5 26C33.6716 26 33 25.3284 33 24.5Z" fill={className}/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9393 38.4393C18.5251 37.8536 19.4749 37.8536 20.0607 38.4393L24 42.3787L27.9393 38.4393C28.5251 37.8536 29.4749 37.8536 30.0607 38.4393C30.6464 39.0251 30.6464 39.9749 30.0607 40.5607L25.0607 45.5607C24.4749 46.1464 23.5251 46.1464 22.9393 45.5607L17.9393 40.5607C17.3536 39.9749 17.3536 39.0251 17.9393 38.4393Z" fill={className}/>
        </svg>
    );
}