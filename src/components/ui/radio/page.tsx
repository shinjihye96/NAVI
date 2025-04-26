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

export const Radio = forwardRef<HTMLInputElement, CheckboxProps>(
    (
      {
        checked,
        onChange,
        value,
        onKeyDown,
        onBlur,
        onFocus,
        label,
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
        <label className={`radio-wrapper flex items-center gap-[8px] cursor-pointer ${className}`}>
            <input
                type="radio"
                className="hidden"
                checked={checked}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            <div className={`rounded-[50%] border w-[16px] h-[16px]${disabled ? 'border-gray-300 bg-gray-100' : checked ? 'border-green-400' : 'border-gray-500'}`}>
                {checked && (
                   <div className={`w-[8px] h-[8px]  ${checked ? disabled ? 'bg-gray-300' : 'bg-green-400' : 'bg-transparent'}`}></div>
                )}
            </div>
            <span className={`text-[14px] font-regular leading-[20px] ${disabled ? 'text-gray-600' : 'text-gray-900'}`}>{label}</span>
        </label>
    );
});