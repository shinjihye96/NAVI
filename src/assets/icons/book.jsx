import React from 'react';

export default function arrow_left({ size = 48, className, ...props }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.5C2 8.46243 4.46243 6 7.5 6H16.396C19.6446 6 22.4329 7.85787 24 10.6027C25.5671 7.85787 28.3554 6 31.604 6H40.5C43.5376 6 46 8.46243 46 11.5V30.5C46 33.5376 43.5376 36 40.5 36H32.1755C29.9281 36 27.8401 37.161 26.6542 39.0701L25.2742 41.2915C25.0005 41.7321 24.5186 42 24 42C23.4814 42 22.9995 41.7321 22.7258 41.2915L21.3458 39.0701C20.1599 37.161 18.0719 36 15.8245 36H7.5C4.46243 36 2 33.5376 2 30.5V11.5ZM22.5 16.8564L22.3125 14.9888C21.9575 11.4527 19.3051 9 16.396 9H7.5C6.11929 9 5 10.1193 5 11.5V30.5C5 31.8807 6.11929 33 7.5 33H15.8245C18.3527 33 20.7428 34.0052 22.5 35.7405V16.8564ZM25.5 35.7405C27.2572 34.0052 29.6473 33 32.1755 33H40.5C41.8807 33 43 31.8807 43 30.5V11.5C43 10.1193 41.8807 9 40.5 9H31.604C28.6949 9 26.0425 11.4527 25.6875 14.9888L25.5 16.8564V35.7405ZM8 16.5C8 15.6716 8.67157 15 9.5 15H18C18.8284 15 19.5 15.6716 19.5 16.5C19.5 17.3284 18.8284 18 18 18H9.5C8.67157 18 8 17.3284 8 16.5ZM28.5 16.5C28.5 15.6716 29.1716 15 30 15H38.5C39.3284 15 40 15.6716 40 16.5C40 17.3284 39.3284 18 38.5 18H30C29.1716 18 28.5 17.3284 28.5 16.5ZM8 25.5C8 24.6716 8.67157 24 9.5 24H18C18.8284 24 19.5 24.6716 19.5 25.5C19.5 26.3284 18.8284 27 18 27H9.5C8.67157 27 8 26.3284 8 25.5ZM28.5 25.5C28.5 24.6716 29.1716 24 30 24H38.5C39.3284 24 40 24.6716 40 25.5C40 26.3284 39.3284 27 38.5 27H30C29.1716 27 28.5 26.3284 28.5 25.5Z" fill={className}/>
        </svg>
    );
}