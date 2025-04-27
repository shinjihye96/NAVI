'use client';

import React from 'react';

interface AppBarProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
  sticky?: boolean;
}

export default function AppBar({
  title,
  left,
  right,
  center,
  sticky = true,
}: AppBarProps) {
  return (
    <header className={`h-[56px] px-4 flex items-center border-b bg-base-wf ${sticky && 'sticky top-0 z-10'}`}>
      <div className="grid items-center grid-cols-[1fr_2fr_1fr] w-full">
        <div className="flex justify-start">{left}</div>
        <div className="flex justify-center">
          {center ? center : title && <h1 className="text-center font-medium">{title}</h1>}
        </div>
        <div className="flex justify-end gap-2">{right}</div>
      </div>
    </header>
  );
}