import { useState } from "react";

interface InputProps{
    className?: string;
    label?: string;
    type?: 'line' | 'box' | 'noLine'
    value: string;
    name: string;
    onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: boolean;
}
export default function Input({
    className = '',
    label,
    type = 'box',
    value,
    name,
    onChange,
    onBlur,
    onKeyDown,
    disabled = false,
    error = false,
}: InputProps){
    const [inputValue, setInputValue] = useState(value ?? '');

    const inputType = () => {
        switch(type){
            case 'line':
                return `border-b ${error ? 'border-semantic-r300' : 'border-gray-400'} disabled:border-gray-400 focus:border-green-400`;
            case 'box':
                return `border rounded-[6rem] px-[12rem] ${error ? 'border-semantic-r300' : 'border-gray-400'} disabled:border-gray-400 focus:border-green-400`;
            case 'noLine':
                return `border-none`;
        }
    }

    const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        setInputValue(inputValue);

        if(onChange){
            onChange(e);
        }
    }

    return(
        <label className={`grid gap-[4rem]`}>
            <p className="text-[14rem] text-gray-700 leading-[20rem] font-400">{label}</p>
            <input
                type="text"
                value={inputValue}
                name={name}
                onChange={valueHandler}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                disabled={disabled}
                className={`h-[40rem] placeholder:text-gray-600 font-normal text-gray-900 leading-[20rem] text-[16rem] disabled:bg-gray-200 ${inputType()}`}
            />
        </label>
    );
}