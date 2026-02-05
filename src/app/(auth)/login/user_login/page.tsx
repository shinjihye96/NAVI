'use client';

import { Button, TextButton } from "components/ui/button/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken, setRefreshToken } from "api";
import Input from "components/ui/input/page";

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
        <div className="flex flex-col min-h-screen bg-base-wf px-[24rem] pb-[calc(env(safe-area-inset-bottom))]">
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
            <div className="flex-1">
                <div className="flex flex-col gap-[16rem]">
                    <Input
                        name="userId"
                        type="line"
                        label="아이디"
                        value={email}
                        onChange={(e) => setEmail(e!.target.value)}
                    />
                    <Input
                        name="password"
                        type="line"
                        label="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e!.target.value)}
                    />
                </div>
                {error && (
                    <p className="mt-[12rem] text-[14rem] text-semantic-r300">{error}</p>
                )}
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
