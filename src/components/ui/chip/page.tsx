import React, { useState } from 'react';
import styles from './page.module.scss';
import { Icon } from 'icon/page';

interface ChipsProps{
    type?: string,
    typeName?: string,
    iconName?: string,
    iconPosition?: 'r' | 'l',
    imageSrc?: string,
    imageAlt?: string,
    imagePosition?: 'r' | 'l',
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
    imageSrc,
    imageAlt,
    imagePosition,
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
                {imagePosition == 'l' && imageSrc && ( <img src={imageSrc} alt={imageAlt} className='w-[16rem] aspect-square' /> )}
                {iconPosition == 'l' && iconName && (
                    <Icon
                        name={iconName}
                        size={16}
                    />
                )}
                {text && <p className='text-[12rem] text-gray-900 leading-[15.6rem]'>{text}</p>}
                {imagePosition == 'r' && imageSrc && ( <img src={imageSrc} alt={imageAlt} className='w-[16rem] aspect-square' /> )}
                {iconPosition == 'r' && iconName && (
                   <Icon
                        name={iconName}
                        size={16}
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
                        size={16}
                    />
                )}
                <p className='text-[12rem] text-gray-900 leading-[15.6rem]'>{text}</p>
                {iconPosition == 'r' && iconName && (
                   <Icon
                        name={iconName}
                        size={16}
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
                    size={16}
                />
            )}
            {text && <p className='text-[12rem] text-gray-900 leading-[15.6rem]'>{text}</p>}
            {iconPosition == 'r' && iconName && (
               <Icon
                    name={iconName}
                    size={16}
                />
            )}
        </div>
    );
}