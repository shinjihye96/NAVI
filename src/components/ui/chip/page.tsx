import React from 'react';
import styles from './page.module.scss';
import { Icon } from 'icon/page';

interface ChipsProps{
    type?: string,
    typeName?: string,
    iconName?: string,
    iconPosition?: string,
    text: string,
    className?: string,
    onclick?: () => void,
    onChange?: () => void,
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
    ...props
}:ChipsProps) {
    if(onclick) {
        return (
            <button className={`${styles.chip} ${className}`} onClick={onclick} {...props}>
                {iconPosition == 'left' && iconName && (
                    <Icon name={iconName} size={16} className={`btn_icon`} />
                )}
                {text && <p className='txt'>{text}</p>}
                {iconPosition == 'right' && iconName && (
                   <Icon name={iconName} size={16} className={`btn_icon`} />
                )}
            </button>
        );
    }

    if(type == 'radio' && 'checkbox') {
        return (
            <label className={`${styles.chip} ${className}`} {...props}>
                <input type={type} name={typeName} onChange={onChange}/>
                {iconPosition == 'left' && iconName && (
                   <Icon name={iconName} size={16} className={`btn_icon`} />
                )}
                <p className='txt'>{text}</p>
                {iconPosition == 'right' && iconName && (
                   <Icon name={iconName} size={16} className={`btn_icon`} />
                )}
            </label>
        );
    }
    
    return(
        <div className={`${styles.chip} ${className}`} {...props}>
            {iconPosition == 'left' && iconName && (
               <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
            {text && <p className='txt'>{text}</p>}
            {iconPosition == 'right' && iconName && (
               <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
        </div>
    );
}