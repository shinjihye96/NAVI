'use client';

import React from 'react';

interface AppBarProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
  sticky?: boolean;
  className?: String;
}

export default function AppBar({
  title,
  left,
  right,
  center,
  sticky = true,
  className = ''
}: AppBarProps) {
  return (
    <header className={`h-[56px] px-4 flex items-center bg-base-wf ${sticky && 'fixed top-0 left-1/2 -translate-x-1/2 max-w-[414rem] w-full z-50'} ${className}`}>
      <div className="grid items-center grid-cols-[1fr_2fr_1fr] w-full">
        <div className="flex justify-start">{left}</div>
        <div className="flex justify-center">
          {center ? center : title && <h1 className="text-center font-medium">{title}</h1>}
        </div>
        <div className="flex justify-end gap-2 pr-[16px]">{right}</div>
      </div>
    </header>
  );
}