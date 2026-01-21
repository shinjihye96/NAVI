'use client';

import { useState, useEffect } from "react";
import AppBar from "components/appBar/page";
import BottomNav from "components/section/bottomNav/page";
import { getAccessToken, usersApi } from "api";
import { useQuery } from "@tanstack/react-query";

export default function Mypage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const hasToken = isClient && !!getAccessToken();

    // 현재 사용자 정보 조회
    const { data: currentUser, isLoading, isError, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => usersApi.getMe(),
        enabled: hasToken,
    });

    return (
        <div className="flex flex-col min-h-screen bg-base-wf">
            <AppBar
                title="내정보"
                sticky={true}
            />
            <main className="flex-1 pt-[56px] pb-[76rem]">
                <div className="p-[16rem] space-y-[24rem]">
                    <section className="bg-gray-100 rounded-[12rem] p-[16rem]">
                        <h2 className="text-[16rem] font-semibold text-gray-950 mb-[12rem]">로그인 상태</h2>
                        <div className="space-y-[8rem]">
                            <div className="flex justify-between">
                                <span className="text-[14rem] text-gray-600">상태</span>
                                <span className={`text-[14rem] font-medium ${hasToken ? 'text-green-500' : 'text-red-500'}`}>
                                    {hasToken ? '로그인됨' : '로그아웃'}
                                </span>
                            </div>
                            {hasToken && currentUser && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-[14rem] text-gray-600">닉네임</span>
                                        <span className="text-[14rem] text-gray-950">{currentUser.nickname}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[14rem] text-gray-600">이메일</span>
                                        <span className="text-[14rem] text-gray-950">{currentUser.email}</span>
                                    </div>
                                </>
                            )}
                            {isLoading && (
                                <p className="text-[14rem] text-gray-500">사용자 정보 로딩 중...</p>
                            )}
                            {isError && (
                                <p className="text-[14rem] text-red-500">사용자 정보 조회 실패: {(error as Error)?.message}</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
