import { Icon } from 'icon/page';
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

export interface CheckboxProps {
    className?: string;
    checked: boolean;
    value: string | number;
    label: string;
    disabled?: boolean;
    onChange: (checked?: boolean) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
      {
        checked =false,
        onChange,
        value = '',
        onKeyDown,
        onBlur,
        onFocus,
        label = '',
        disabled = false,
        className = '',
      },
      ref
) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <label className={`checkbox-wrapper flex items-center gap-[8px] cursor-pointer ${className}`}>
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            <div className={`rounded-[50%] border w-[16rem] h-[16rem] aspect-square ${disabled ? checked ? 'bg-gray-300 border-gray-300' : 'bg-gray-100 border-gray-300' : checked ? 'bg-green-400 border-green-400' : 'bg-white border-gray-500'}`}>
                {checked && (
                    <Icon
                        name='Check'
                        size={16}
                        className='text-base-wf w-full'
                    />
                )}
            </div>
            <span className={`text-[14px] font-regular leading-[20px] ${disabled ? 'text-gray-600' : 'text-gray-900'}`}>{label}</span>
        </label>
    );
});
