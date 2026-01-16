'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from 'components/appBar/page';
import { IconButton, TextButton } from 'components/ui/button/page';
import Search from 'components/ui/searchBar/page';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, followsApi, getAccessToken } from 'api';
import Image from 'next/image';

type TabType = 'followers' | 'following';
type SortType = 'latest' | 'oldest' | 'alphabetical';

export default function FollowPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<TabType>('followers');
    const [searchValue, setSearchValue] = useState('');
    const [sortType, setSortType] = useState<SortType>('latest');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const hasToken = isClient && !!getAccessToken();

    // 현재 사용자 정보
    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => usersApi.getMe(),
        enabled: hasToken,
    });

    // 팔로워 목록
    const { data: followersData } = useQuery({
        queryKey: ['followers', currentUser?.id],
        queryFn: () => usersApi.getFollowers(currentUser!.id, 1, 1000),
        enabled: hasToken && !!currentUser?.id,
    });

    // 팔로잉 목록
    const { data: followingData } = useQuery({
        queryKey: ['following', currentUser?.id],
        queryFn: () => usersApi.getFollowing(currentUser!.id, 1, 1000),
        enabled: hasToken && !!currentUser?.id,
    });

    // 내가 팔로우하는 사람들 (팔로우 버튼 상태 확인용)
    const followingIds = new Set(
        followingData?.items?.map((user) => String(user.id)) || []
    );

    const isUserFollowing = (userId: string | number): boolean => {
        return followingIds.has(String(userId));
    };

    // 팔로우/언팔로우 mutation
    const followMutation = useMutation({
        mutationFn: async ({ userId, isCurrentlyFollowing }: { userId: string; isCurrentlyFollowing: boolean }) => {
            if (isCurrentlyFollowing) {
                await followsApi.unfollow(userId);
                return { action: 'unfollowed' as const, userId };
            } else {
                await followsApi.follow(userId);
                return { action: 'followed' as const, userId };
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['followers', currentUser?.id] });
            queryClient.invalidateQueries({ queryKey: ['following', currentUser?.id] });
            queryClient.invalidateQueries({ queryKey: ['myFollowing', currentUser?.id] });
        },
    });

    const handleFollowClick = (userId: string, isCurrentlyFollowing: boolean) => {
        followMutation.mutate({ userId, isCurrentlyFollowing });
    };

    // 현재 탭의 데이터
    const currentList = activeTab === 'followers'
        ? followersData?.items || []
        : followingData?.items || [];

    // 검색 필터
    const filteredList = currentList.filter((user) =>
        user.nickname?.toLowerCase().includes(searchValue.toLowerCase())
    );

    // 정렬
    const sortedList = [...filteredList].sort((a, b) => {
        if (sortType === 'alphabetical') {
            return (a.nickname || '').localeCompare(b.nickname || '', 'ko');
        }
        // latest/oldest는 API에서 정렬된 상태로 오므로 그대로 사용
        return 0;
    });

    const sortLabels: Record<SortType, string> = {
        latest: '최신순',
        oldest: '오래된순',
        alphabetical: '가나다순',
    };

    return (
        <div className="min-h-screen bg-base-wf">
            <AppBar
                left={
                    <IconButton
                        iconName="ArrowLeft"
                        size="l"
                        color="tertiary"
                        onClick={() => router.back()}
                    />
                }
            />

            {/* 탭 */}
            <div className="flex border-b border-gray-200 mt-[56px]">
                <button
                    className={`flex-1 py-[12rem] text-center text-[16rem] font-medium ${
                        activeTab === 'followers'
                            ? 'text-primary-500 border-b-2 border-primary-500'
                            : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('followers')}
                >
                    팔로워 {followersData?.items?.length || 0}
                </button>
                <button
                    className={`flex-1 py-[12rem] text-center text-[16rem] font-medium ${
                        activeTab === 'following'
                            ? 'text-primary-500 border-b-2 border-primary-500'
                            : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('following')}
                >
                    팔로잉 {followingData?.items?.length || 0}
                </button>
            </div>

            {/* 검색바 */}
            <div className="px-[16rem] py-[12rem]">
                <Search
                    value={searchValue}
                    name="search"
                    onChange={(e) => setSearchValue(e?.target.value || '')}
                />
            </div>

            {/* 정렬 */}
            <div className="flex items-center justify-between px-[16rem] py-[8rem]">
                <span className="text-[14rem] text-gray-600">닉네임 기준</span>
                <div className="relative">
                    <TextButton
                        txt={sortLabels[sortType]}
                        color="secondary"
                        iconName="ChevronDown"
                        iconPosition="r"
                        onClick={() => setShowSortOptions(!showSortOptions)}
                    />
                    {showSortOptions && (
                        <div className="absolute right-0 top-full mt-[4rem] bg-white rounded-[8rem] shadow-lg border border-gray-200 z-10 min-w-[120rem]">
                            {(['latest', 'oldest', 'alphabetical'] as SortType[]).map((type) => (
                                <button
                                    key={type}
                                    className={`w-full px-[16rem] py-[12rem] text-left text-[14rem] ${
                                        sortType === type ? 'text-primary-500' : 'text-gray-700'
                                    } hover:bg-gray-50`}
                                    onClick={() => {
                                        setSortType(type);
                                        setShowSortOptions(false);
                                    }}
                                >
                                    {sortLabels[type]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 목록 */}
            <ul className="px-[16rem]">
                {sortedList.length === 0 ? (
                    <li className="py-[48rem] text-center text-gray-500">
                        {searchValue ? '검색 결과가 없습니다' : '아직 목록이 없습니다'}
                    </li>
                ) : (
                    sortedList.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between py-[12rem] border-b border-gray-100"
                        >
                            <div className="flex items-center gap-[12rem]">
                                <div className="w-[48rem] h-[48rem] rounded-full bg-sky-100 flex items-center justify-center overflow-hidden">
                                    {user.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.nickname || ''}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src="/img/Butterfly.png"
                                            alt="Default Profile"
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="text-[14rem] font-semibold text-gray-950">
                                        {user.nickname}
                                    </p>
                                    <p className="text-[12rem] text-gray-600">
                                        {user.userType}
                                    </p>
                                </div>
                            </div>
                            <TextButton
                                txt={isUserFollowing(user.id) ? '팔로잉' : '팔로우'}
                                color={isUserFollowing(user.id) ? 'retreative' : 'primary'}
                                onClick={() => handleFollowClick(String(user.id), isUserFollowing(user.id))}
                            />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
