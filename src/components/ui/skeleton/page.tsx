interface DailyShareSkeletonProps {
    className?: string;
    count?: number;
}
export function DailyShareSkeleton(props: DailyShareSkeletonProps) {
    const { className, count = 5 } = props;
    return (
        <div className={`flex-1 flex flex-col gap-[16rem] px-[16rem] py-[16rem] ${className}`}>
            {[...Array(count)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="flex items-center gap-[12rem] mb-[12rem]">
                        <div className="w-[40rem] h-[40rem] bg-gray-200 rounded-full" />
                        <div className="flex-1">
                            <div className="h-[16rem] bg-gray-200 rounded w-[80rem] mb-[4rem]" />
                            <div className="h-[12rem] bg-gray-200 rounded w-[60rem]" />
                        </div>
                    </div>
                    <div className="h-[60rem] bg-gray-200 rounded mb-[12rem]" />
                    <div className="h-[120rem] bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
}