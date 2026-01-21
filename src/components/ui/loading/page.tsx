interface LoadingSpinnerProps {
    size?: 's' | 'm' | 'l';
    className?: string;
}

const sizeMap = {
    s: 'w-[32rem] h-[32rem]',
    m: 'w-[48rem] h-[48rem]',
    l: 'w-[80rem] h-[80rem]',
};

const strokeWidthMap = {
    s: 3,
    m: 4,
    l: 6,
};

export function LoadingSpinner({ size = 'm', className = '' }: LoadingSpinnerProps) {
    const sizeClass = sizeMap[size];
    const strokeWidth = strokeWidthMap[size];

    return (
        <div className={`${sizeClass} ${className}`}>
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#C8E6C9"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray="198 66"
                    className="animate-spin origin-center"
                    style={{
                        animation: 'spin 1.2s linear infinite',
                        transformOrigin: 'center',
                    }}
                />
            </svg>
        </div>
    );
}

interface LoadingOverlayProps {
    size?: 's' | 'm' | 'l';
    text?: string;
}

export function LoadingOverlay({ size = 'l', text }: LoadingOverlayProps) {
    return (
        <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
            <LoadingSpinner size={size} />
            {text && (
                <p className="mt-[16rem] text-[14rem] text-gray-600">{text}</p>
            )}
        </div>
    );
}

interface LoadingContainerProps {
    size?: 's' | 'm' | 'l';
    className?: string;
}

export function LoadingContainer({ size = 'm', className = '' }: LoadingContainerProps) {
    return (
        <div className={`flex items-center justify-center py-[48rem] ${className}`}>
            <LoadingSpinner size={size} />
        </div>
    );
}

export default function Loading() {
    return <LoadingOverlay />;
}
