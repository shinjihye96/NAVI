import { Icon } from "icon/page";
import { useState } from "react";


interface SearchProps{
    className?: string;
    value: string;
    name: string;
    onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
}
export default function Search({
    className,
    value,
    name,
    onChange,
    onBlur,
}: SearchProps){
    const [inputValue, setInputValue] = useState(value ?? '');

    const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        setInputValue(newValue);

        if(onChange){
            onChange;
        }
    }

    const clearHandler = () => {
        setInputValue('');
    }
    return(
        <div className={`relative grid items-center grid-cols-[auto_1fr_48rem] gap-[8rem] min-w-[360rem] bg-gray-200 px-[12rem] py-[8rem] rounded-[6rem] ${className}`}>
            <Icon
                name="Search"
                size={16}
                className="m-auto"
            />
            <input
                type="text"
                value={inputValue}
                name={name}
                onChange={valueHandler}
                onBlur={onBlur}
                className="placeholder:text-gray-600 text-gray-900 font-normal leading-[20rem] text-[14rem]"
            />
            <div className="flex items-center justify-end">
                {inputValue && (
                    <button
                        type="button"
                        onClick={clearHandler}
                    >
                        <Icon
                            name="XCircleFill"
                            size={16}
                            className="text-gray-600"
                        />
                    </button>
                )}
            </div>
        </div>
    );
}