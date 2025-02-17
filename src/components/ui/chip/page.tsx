import React, { useState } from 'react';
import styles from './page.module.scss';
import { Icon } from 'icon/page';

interface ChipsProps{
    type?: string,
    typeName?: string,
    iconName?: string,
    iconPosition?: 'r' | 'l',
    text: string,
    className?: string,
    onclick?: () => void,
    onChange?: () => void,
    checked?: boolean;
}
export default function Chips({
    type = 'radio',
    typeName,
    iconName,
    iconPosition,
    text,
    className = '',
    onclick,
    onChange,
    checked = false,
    ...props
}:ChipsProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);

        if (onChange) {
          onChange();
        }
    };

    if(onclick) {
        return (
            <button 
                className={`inline-flex items-center gap-[3rem] px-[6rem] py-[8rem] border border-gray-400 rounded-[50rem] cursor-pointer ${className}`} 
                onClick={onclick} 
                {...props}
            >
                {iconPosition == 'l' && iconName && (
                    <Icon
                        name={iconName}
                        size={20}
                    />
                )}
                {text && <p className='text-[12rem] text-gray-900 leading-[15.6rem]'>{text}</p>}
                {iconPosition == 'r' && iconName && (
                   <Icon
                        name={iconName}
                        size={20}
                    />
                )}
            </button>
        );
    }

    if(type == 'radio' || 'checkbox') {
        return (
            <label 
                className={`inline-flex items-center gap-[3rem] px-[6rem] py-[8rem] border rounded-[50rem] cursor-pointer ${isChecked ? 'border-gray-400' : 'border-green-400'} ${className}`} 
                {...props}
            >
                <input 
                    type={type} 
                    name={typeName} 
                    className='hidden' 
                    onChange={handleChange}
                />
                {iconPosition == 'l' && iconName && (
                   <Icon
                        name={iconName}
                        size={20}
                    />
                )}
                <p className='text-[12rem] text-gray-900 leading-[15.6rem]'>{text}</p>
                {iconPosition == 'r' && iconName && (
                   <Icon
                        name={iconName}
                        size={20}
                    />
                )}
            </label>
        );
    }
    
    return(
        <div 
            className={`inline-flex items-center gap-[3rem] px-[6rem] py-[8rem] border border-gray-400 rounded-[50rem] cursor-pointer ${className}`} 
            {...props}
        >
            {iconPosition == 'l' && iconName && (
               <Icon
                    name={iconName}
                    size={20}
                />
            )}
            {text && <p className='text-[12rem] text-gray-900 leading-[15.6rem]'>{text}</p>}
            {iconPosition == 'r' && iconName && (
               <Icon
                    name={iconName}
                    size={20}
                />
            )}
        </div>
    );
}