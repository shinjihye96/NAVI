'use client';

interface TabItem {
    label: string;
    value: string;
    count?: number;
}

interface BaseTabProps {
    label: string;
    isActive: boolean;
    count?: number;
    onClick: () => void;
    className?: string;
}

function BaseTab({ label, isActive, count, onClick, className = '' }: BaseTabProps) {
    const displayCount = count !== undefined ? (count > 99 ? '99+' : count) : null;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-[4rem] min-w-[80rem] cursor-pointer ${className}`}
        >
            <div className="flex items-center gap-[4rem]">
                <p
                    className={`text-[14rem] leading-[20rem] font-semibold ${
                        isActive ? 'text-gray-950' : 'text-gray-500'
                    }`}
                >
                    {label}
                </p>
                {displayCount !== null && (
                    <p
                        className={`text-[14rem] leading-[20rem] ${
                            isActive ? 'text-gray-950' : 'text-gray-500'
                        }`}
                    >
                        {displayCount}
                    </p>
                )}
            </div>
            <div
                className={`w-full rounded-full ${isActive && 'h-[2rem] bg-green-500'}`}
            />
        </button>
    );
}

interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onChange: (value: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
    return (
        <div className={`grid grid-cols-${tabs.length} ${className}`}>
            {tabs.map((tab) => (
                <BaseTab
                    key={tab.value}
                    label={tab.label}
                    isActive={activeTab === tab.value}
                    count={tab.count}
                    className=""
                    onClick={() => onChange(tab.value)}
                />
            ))}
        </div>
    );
}

interface TabsGroupProps {
    tabs: TabItem[];
    activeTab: string;
    onChange: (value: string) => void;
    className?: string;
}

export function TabsGroup({ tabs, activeTab, onChange, className = '' }: TabsGroupProps) {
    return (
        <div className={`flex overflow-x-auto scrollbar-hide ${className}`}>
            <div className="flex">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onChange(tab.value)}
                        className="flex flex-col items-center px-[12rem] py-[8rem]"
                    >
                        <p
                            className={`text-[14rem] leading-[20rem] font-semibold whitespace-nowrap ${
                                activeTab === tab.value ? 'text-gray-950' : 'text-gray-500'
                            }`}
                        >
                            {tab.label}
                        </p>
                        <div
                            className={`h-[2rem] w-[24rem] mt-[4rem] rounded-full ${
                                activeTab === tab.value ? 'bg-primary-500' : 'bg-gray-200'
                            }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export type { TabItem };
