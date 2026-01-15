'use client';

import AppBar from "components/appBar/page";
import BottomNav from "components/section/bottomNav/page";

export default function Community() {
    return (
        <div className="flex flex-col min-h-screen bg-base-wf">
            <AppBar
                title="커뮤니티"
                sticky={true}
            />

            <main className="flex-1 pt-[56px] pb-[76rem]">
                <div className="p-[16rem]">
                    <p className="text-[16rem] text-gray-600">커뮤니티 페이지 준비 중입니다.</p>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
