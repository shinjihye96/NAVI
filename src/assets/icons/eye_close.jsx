import React from 'react';
import { Colors } from '../../styles/color';

let size = 48;
let fillColor = 'Colors.Gray900';

export default function eye_close({ size, fillColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.9828 14.0579C41.1861 13.8307 40.3561 14.2923 40.1289 15.089C39.7529 16.4071 39.1956 17.6661 38.4759 18.837L39.7539 19.6224L38.4759 18.837C37.3947 20.5962 35.9465 22.1575 34.1969 23.4187C33.5295 23.8998 32.8268 24.3311 32.0956 24.71C29.6332 25.9858 26.8494 26.6671 23.9999 26.6671C21.1505 26.6671 18.3667 25.9858 15.9043 24.71C15.1731 24.3311 14.4704 23.8998 13.8029 23.4187C12.0534 22.1575 10.6052 20.5962 9.52395 18.837C8.80431 17.6661 8.24694 16.4071 7.87099 15.089C7.64377 14.2923 6.81375 13.8307 6.01709 14.0579C5.22044 14.2851 4.75882 15.1151 4.98604 15.9118C5.31602 17.0688 5.76145 18.1853 6.31221 19.2481L2.56324 22.2455C1.9162 22.7628 1.81104 23.7067 2.32837 24.3538C2.8457 25.0008 3.7896 25.106 4.43665 24.5886L7.9178 21.8054C9.06363 23.3364 10.454 24.7028 12.0486 25.8523C12.4186 26.119 12.7974 26.3724 13.1841 26.6124L10.9732 30.6074C10.5721 31.3322 10.8345 32.245 11.5594 32.6462C12.2842 33.0473 13.197 32.7849 13.5981 32.06L15.8457 27.9986C17.941 28.8984 20.193 29.4467 22.4999 29.6131V34.5004C22.4999 35.3288 23.1715 36.0004 23.9999 36.0004C24.8284 36.0004 25.4999 35.3288 25.4999 34.5004V29.6131C27.8069 29.4467 30.0589 28.8984 32.1542 27.9986L34.4018 32.06C34.8029 32.7849 35.7157 33.0473 36.4405 32.6462C37.1654 32.245 37.4278 31.3322 37.0267 30.6074L34.8158 26.6124C35.2025 26.3724 35.5813 26.119 35.9513 25.8523C37.5459 24.7028 38.9363 23.3364 40.0821 21.8054L43.5632 24.5886C44.2103 25.106 45.1542 25.0008 45.6715 24.3538C46.1888 23.7067 46.0837 22.7628 45.4366 22.2455L41.6877 19.2481C42.2384 18.1853 42.6839 17.0688 43.0138 15.9118C43.2411 15.1151 42.7795 14.2851 41.9828 14.0579Z" fill={fillColor}/>
        </svg>
    );
}