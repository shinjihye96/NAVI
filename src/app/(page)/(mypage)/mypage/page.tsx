'use client';

import { useState, useEffect } from "react";
import AppBar from "components/appBar/page";
import BottomNav from "components/section/bottomNav/page";
import { getAccessToken, getRefreshToken, usersApi } from "api";
import { useQuery } from "@tanstack/react-query";

export default function Mypage() {
    const [isClient, setIsClient] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
        setAccessToken(getAccessToken());
        setRefreshToken(getRefreshToken());
    }, []);

    const hasToken = isClient && !!accessToken;

    // 현재 사용자 정보 조회
    const { data: currentUser, isLoading, isError, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => usersApi.getMe(),
        enabled: hasToken,
    });

    // 토큰 만료 여부 체크 (JWT 디코딩)
    const getTokenExpiry = (token: string | null) => {
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expDate = new Date(payload.exp * 1000);
            const now = new Date();
            const isExpired = expDate < now;
            return { expDate, isExpired, payload };
        } catch {
            return null;
        }
    };

    const accessTokenInfo = getTokenExpiry(accessToken);
    const refreshTokenInfo = getTokenExpiry(refreshToken);

    return (
        <div className="flex flex-col min-h-screen bg-base-wf">
            <AppBar
                title="내정보"
                sticky={true}
            />
            <main className="flex-1 pt-[56px] pb-[76rem]">
                <div className="p-[16rem] space-y-[24rem]">
                    {/* 로그인 상태 */}
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

                    {/* Access Token 정보 */}
                    <section className="bg-gray-100 rounded-[12rem] p-[16rem]">
                        <h2 className="text-[16rem] font-semibold text-gray-950 mb-[12rem]">Access Token</h2>
                        <div className="space-y-[8rem]">
                            <div className="flex justify-between">
                                <span className="text-[14rem] text-gray-600">존재 여부</span>
                                <span className={`text-[14rem] font-medium ${accessToken ? 'text-green-500' : 'text-red-500'}`}>
                                    {accessToken ? '있음' : '없음'}
                                </span>
                            </div>
                            {accessTokenInfo && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-[14rem] text-gray-600">만료 여부</span>
                                        <span className={`text-[14rem] font-medium ${accessTokenInfo.isExpired ? 'text-red-500' : 'text-green-500'}`}>
                                            {accessTokenInfo.isExpired ? '만료됨' : '유효함'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[14rem] text-gray-600">만료 시간</span>
                                        <span className="text-[14rem] text-gray-950">
                                            {accessTokenInfo.expDate.toLocaleString('ko-KR')}
                                        </span>
                                    </div>
                                </>
                            )}
                            {accessToken && (
                                <div className="mt-[8rem]">
                                    <p className="text-[12rem] text-gray-500 mb-[4rem]">토큰 (앞 50자)</p>
                                    <p className="text-[12rem] text-gray-700 break-all bg-gray-200 p-[8rem] rounded-[4rem]">
                                        {accessToken.slice(0, 50)}...
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Refresh Token 정보 */}
                    <section className="bg-gray-100 rounded-[12rem] p-[16rem]">
                        <h2 className="text-[16rem] font-semibold text-gray-950 mb-[12rem]">Refresh Token</h2>
                        <div className="space-y-[8rem]">
                            <div className="flex justify-between">
                                <span className="text-[14rem] text-gray-600">존재 여부</span>
                                <span className={`text-[14rem] font-medium ${refreshToken ? 'text-green-500' : 'text-red-500'}`}>
                                    {refreshToken ? '있음' : '없음'}
                                </span>
                            </div>
                            {refreshTokenInfo && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-[14rem] text-gray-600">만료 여부</span>
                                        <span className={`text-[14rem] font-medium ${refreshTokenInfo.isExpired ? 'text-red-500' : 'text-green-500'}`}>
                                            {refreshTokenInfo.isExpired ? '만료됨' : '유효함'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[14rem] text-gray-600">만료 시간</span>
                                        <span className="text-[14rem] text-gray-950">
                                            {refreshTokenInfo.expDate.toLocaleString('ko-KR')}
                                        </span>
                                    </div>
                                </>
                            )}
                            {refreshToken && (
                                <div className="mt-[8rem]">
                                    <p className="text-[12rem] text-gray-500 mb-[4rem]">토큰 (앞 50자)</p>
                                    <p className="text-[12rem] text-gray-700 break-all bg-gray-200 p-[8rem] rounded-[4rem]">
                                        {refreshToken.slice(0, 50)}...
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
