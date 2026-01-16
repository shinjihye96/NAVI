'use client';

import { Button, TextButton } from "components/ui/button/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken, setRefreshToken } from "api";

export default function LoginId() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('로그인 응답:', data);

            if (!response.ok) {
                setError(data.message || '로그인에 실패했습니다.');
                return;
            }

            // 응답 구조에 따라 토큰 추출
            const tokens = data.data?.tokens || data.tokens || data.data;
            const accessToken = tokens?.accessToken || tokens?.access_token;
            const refreshToken = tokens?.refreshToken || tokens?.refresh_token;

            if (accessToken) {
                setAccessToken(accessToken);
                if (refreshToken) {
                    setRefreshToken(refreshToken);
                }
                router.replace('/daily_share');
            } else {
                setError('로그인 응답에서 토큰을 찾을 수 없습니다.');
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFindId = () => {
        // 아이디 찾기 구현 예정
        console.log('아이디 찾기');
    };

    const handleFindPassword = () => {
        // 비밀번호 찾기 구현 예정
        console.log('비밀번호 찾기');
    };

    const handleSignup = () => {
        router.push('/signup');
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-wf px-[24rem]">
            {/* 로고 영역 */}
            <div className="pt-[80rem] pb-[40rem] text-center">
                <div className="flex items-center justify-center gap-[8rem]">
                    <span className="text-[32rem] font-bold text-green-500">나비</span>
                </div>
                <p className="mt-[16rem] text-[16rem] leading-[24rem] text-gray-700">
                    나비와 함께
                </p>
                <p className="text-[18rem] leading-[26rem] font-semibold text-green-500">
                    같은 마음을 나누어 보세요.
                </p>
            </div>

            {/* 입력 폼 */}
            <div className="flex-1">
                <div className="flex flex-col gap-[16rem]">
                    <div className="grid gap-[4rem]">
                        <p className="text-[14rem] text-gray-700 leading-[20rem] font-400">아이디</p>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-[40rem] border-b border-gray-400 focus:border-green-400 placeholder:text-gray-600 font-normal text-gray-900 leading-[20rem] text-[16rem] outline-none"
                        />
                    </div>
                    <div className="grid gap-[4rem]">
                        <p className="text-[14rem] text-gray-700 leading-[20rem] font-400">비밀번호</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-[40rem] border-b border-gray-400 focus:border-green-400 placeholder:text-gray-600 font-normal text-gray-900 leading-[20rem] text-[16rem] outline-none"
                        />
                    </div>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <p className="mt-[12rem] text-[14rem] text-semantic-r300">{error}</p>
                )}

                {/* 로그인 버튼 */}
                <div className="mt-[32rem]">
                    <Button
                        txt={isLoading ? '로그인 중...' : '로그인'}
                        color="primary"
                        size="l"
                        className="w-full"
                        disabled={isLoading}
                        onClick={handleLogin}
                    />
                </div>

                {/* 하단 링크 */}
                <div className="mt-[24rem] flex items-center justify-center gap-[24rem]">
                    <TextButton
                        txt="아이디 찾기"
                        color="retreative"
                        onClick={handleFindId}
                    />
                    <TextButton
                        txt="비밀번호 찾기"
                        color="retreative"
                        onClick={handleFindPassword}
                    />
                    <TextButton
                        txt="회원가입"
                        color="retreative"
                        onClick={handleSignup}
                    />
                </div>
            </div>
        </div>
    );
}
