'use client';

import { useEffect, useRef } from 'react';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    closeOnBackdropClick?: boolean;
}

export default function BottomSheet({
    isOpen,
    onClose,
    children,
    className = '',
    closeOnBackdropClick = true,
}: BottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // ESC 키 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={closeOnBackdropClick ? onClose : undefined}
            />
            <div
                ref={sheetRef}
                className={`relative w-full max-w-[414rem] bg-white rounded-t-[24rem] animate-slide-up ${className}`}
            >
                <div className="flex justify-center pt-[12rem] pb-[8rem]">
                    <div className="w-[40rem] h-[4rem] bg-gray-300 rounded-full" />
                </div>
                <div className="px-[16rem] pb-[24rem]">
                    {children}
                </div>
            </div>
        </div>
    );
}
