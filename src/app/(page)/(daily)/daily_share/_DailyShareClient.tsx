'use client';

import AppBar from "components/appBar/page";
import { Button, IconButton, TextButton } from "components/ui/button/page";
import { Checkbox } from "components/ui/checkbox/page";
import { useState, useEffect } from "react";
import TodayMyMood from "./_todayMood";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";
import { dailySharesApi, DailyShareQuery, getAccessToken, reactionsApi, ReactionType, followsApi, usersApi } from "api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { EMOTION_TYPES } from "constants/emotions";
import { DailyShareSkeleton } from "components/ui/skeleton/page";
import Image from "next/image";
import Chips from "components/ui/chip/page";
import { Icon } from "icon/page";
import { LoadingSpinner } from "components/ui/loading/page";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const shareBg = {
    none: "/img/share_bg/None.jpg",
    sun: "/img/share_bg/Sun.jpg",
    sun_and_cloud: "/img/share_bg/Sun_and_Cloud.jpg",
    cloud: "/img/share_bg/Cloud.jpg",
    rain: "/img/share_bg/Rain.jpg",
    ligtning: "/img/share_bg/Lightning.jpg",
};

function PostImage({ src, alt }: { src: string; alt: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="w-full aspect-square relative bg-gray-200 flex items-center justify-center">
                <Icon name="ImageNo" size={48} className="text-gray-400" />
            </div>
        );
    }

    return (
        <div className="w-full aspect-square relative bg-gray-200">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner size="m" />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
            />
        </div>
    );
}

export default function DailyShareClient() {
    const router = useRouter();
    const today = dayjs(new Date()).format('M월 DD일');
    const [filter, setFilter] = useState<'all' | 'caregiver' | 'patient' | undefined>(undefined);
    const [isLatestFirst, setIsLatestFirst] = useState(false);
    const [sameUserType, setSameUserType] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const hasToken = isClient && !!getAccessToken();

    const { data: dailyListData, isLoading, isFetching } = useQuery({
        queryKey: ['dailyShares', filter],
        queryFn: async () => {
            const query: DailyShareQuery = {};
            if (filter) query.filter = filter;
            return dailySharesApi.getAll(query);
        },
        enabled: hasToken,
    });

    const isActuallyLoading = !isClient || (hasToken && (isLoading || (!dailyListData && isFetching)));

    const { data: myDailyData } = useQuery({
        queryKey: ['myTodayShare'],
        queryFn: () => dailySharesApi.checkTodayShare(),
        enabled: hasToken,
    });

    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => usersApi.getMe(),
        enabled: hasToken,
    });

    const { data: myFollowingData } = useQuery({
        queryKey: ['myFollowing', currentUser?.id],
        queryFn: () => usersApi.getFollowing(currentUser!.id, 1, 1000),
        enabled: hasToken && !!currentUser?.id,
    });

    const followingIds = new Set(
        myFollowingData?.items?.map((user) => String(user.id)) || []
    );

    const allDailyList = dailyListData?.items || [];

    const dailyList = isFollowing
    ? allDailyList.filter((post) => followingIds.has(String(post.user?.id)))
    : allDailyList;
    console.log('dailyList: ', dailyList);
    
    const myDaily = myDailyData?.hasShared ? myDailyData.dailyShare : null;

    const hasNoFollowing = followingIds.size === 0;
    const hasFollowingButNoPostsToday = !hasNoFollowing && dailyList.length === 0 && isFollowing;

    const isUserFollowing = (userId: string | number): boolean => {
        if (!hasToken) return false;
        return followingIds.has(String(userId));
    };

    const filterHandler = (newFilter: 'all' | 'caregiver' | 'patient' | undefined) => {
        setFilter(newFilter);
    };

    const latestSortHandler = () => {
        setIsLatestFirst(!isLatestFirst);
    };

    const sameUserTypeHandler = () => {
        setSameUserType(!sameUserType);
    };

    const isFollowingHandler = () => {
        setIsFollowing(!isFollowing);
    };

    const queryClient = useQueryClient();

    const reactionMutation = useMutation({
        mutationFn: ({ dailyShareId, reactionType }: { dailyShareId: string; reactionType: ReactionType }) =>
            reactionsApi.toggle(dailyShareId, reactionType),
        onMutate: async ({ dailyShareId, reactionType }) => {
            await queryClient.cancelQueries({ queryKey: ['dailyShares', filter] });

            const previousData = queryClient.getQueryData(['dailyShares', filter]);

            queryClient.setQueryData(['dailyShares', filter], (old: any) => {
                if (!old?.items) return old;
                return {
                    ...old,
                    items: old.items.map((post: any) => {
                        if (post.id !== dailyShareId) return post;

                        const myReactions = post.myReactions || [];
                        const reactions = post.reactions || [];
                        const isAlreadyReacted = myReactions.includes(reactionType);

                        const newMyReactions = isAlreadyReacted
                            ? myReactions.filter((r: string) => r !== reactionType)
                            : [...myReactions, reactionType];

                        const newReactions = reactions.map((r: any) => {
                            if (r.type !== reactionType) return r;
                            return { ...r, count: isAlreadyReacted ? r.count - 1 : r.count + 1 };
                        });

                        if (!isAlreadyReacted && !reactions.find((r: any) => r.type === reactionType)) {
                            newReactions.push({ type: reactionType, count: 1 });
                        }

                        return {
                            ...post,
                            myReactions: newMyReactions,
                            reactions: newReactions.filter((r: any) => r.count > 0),
                        };
                    }),
                };
            });

            return { previousData };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(['dailyShares', filter], context.previousData);
            }
        },
    });

    const handleReactionClick = (dailyShareId: string, reactionType: ReactionType) => {
        reactionMutation.mutate({ dailyShareId, reactionType });
    };

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
        onMutate: async ({ userId, isCurrentlyFollowing }) => {
            await queryClient.cancelQueries({ queryKey: ['myFollowing', currentUser?.id] });

            const previousFollowingData = queryClient.getQueryData(['myFollowing', currentUser?.id]);

            queryClient.setQueryData(['myFollowing', currentUser?.id], (old: any) => {
                if (!old?.items) return old;
                if (isCurrentlyFollowing) {
                    return {
                        ...old,
                        items: old.items.filter((user: any) => String(user.id) !== userId),
                    };
                } else {
                    return {
                        ...old,
                        items: [...old.items, { id: userId }],
                    };
                }
            });

            return { previousFollowingData };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousFollowingData) {
                queryClient.setQueryData(['myFollowing', currentUser?.id], context.previousFollowingData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myFollowing', currentUser?.id] });
        },
    });

    const handleFollowClick = (userId: string, isCurrentlyFollowing: boolean) => {
        followMutation.mutate({ userId, isCurrentlyFollowing });
    };

    return (
        <div className="relative">
            <AppBar
                left={
                    <p className="pl-[24rem] text-regular text-gray-800 text-[14rem] leading-[20rem]">{today}</p>
                }
                right={
                    <div className="flex items-center gap-[]">
                        <IconButton
                            iconName="Follower"
                            size="l"
                            color="tertiary"
                            onClick={() => router.push('/follow')}
                        />
                        <IconButton
                            iconName="Bell"
                            size="l"
                            color="tertiary"
                            onClick={() => router.push('/notifications')}
                        />
                    </div>
                }
            />
            <article
                className="flex flex-col w-full bg-cover bg-center"
                style={{ minHeight: 'calc(100vh - 132px)' }}
            >
                <div className="absolute inset-0">
                    <img src={shareBg.none} alt="Navi" />
                </div>
                <div className="relative flex flex-col flex-1">
                    <div className="flex-shrink-0">
                        <TodayMyMood dailyListLength={dailyList.length} />
                    </div>
                    <div className="bg-base-wf rounded-t-[24rem] pt-[8rem] flex flex-col flex-1">
                        <div className="flex items-center justify-between py-[12rem] px-[16rem]">
                            <div className="flex items-center gap-[12rem]">
                                <TextButton
                                    txt="최신순"
                                    color="secondary"
                                    iconName={isLatestFirst ? "ChevronUp" : "ChevronDown"}
                                    iconPosition="r"
                                    onClick={latestSortHandler}
                                />
                            </div>
                            <Checkbox
                                label="팔로우"
                                onChange={isFollowingHandler}
                                checked={isFollowing ? true : false}
                                value={'followSort'}
                            />
                        </div>
                        {isActuallyLoading ? (
                            <DailyShareSkeleton count={4} />
                        ) : isFollowing && hasNoFollowing ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-[16rem] py-[48rem]">
                                <p className="text-gray-600 text-[16rem] leading-[24rem] text-center">아직 팔로우한 사람이 없어요</p>
                                <Button
                                    txt="전체 목록 보기"
                                    round
                                    size="m"
                                    color="secondary"
                                    onClick={() => setIsFollowing(false)}
                                />
                            </div>
                        ) : isFollowing && hasFollowingButNoPostsToday ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-[16rem] py-[48rem]">
                                <p className="text-gray-600 text-[16rem] leading-[24rem] text-center">팔로우한 사람들이 아직<br />오늘의 하루를 공유하지 않았어요</p>
                                <Button
                                    txt="전체 목록 보기"
                                    round
                                    size="m"
                                    color="secondary"
                                    onClick={() => setIsFollowing(false)}
                                />
                            </div>
                        ) : !allDailyList.length ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-[24rem]">
                                <p className="text-base-bk text-[20rem] leading-[28rem] font-semibold text-center">오늘은 첫번째로<br />하루를 공유하는 건 어떨까요?</p>
                                <Button
                                    txt="오늘의 하루 공유하기"
                                    round
                                    size="l"
                                    onClick={() => router.push('regist_daily')}
                                />
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-[16rem] px-[16rem] py-[8rem]">
                                {dailyList.map((post, index) => (
                                    <li key={`${post.id}_${index}`} className="py-[12rem]">
                                        <div className="grid grid-cols-[1fr_auto] items-center py-[8rem]">
                                            <div className="flex items-center gap-[8rem]">
                                                <button
                                                    type="button"
                                                    className="w-[48rem] h-[48rem] rounded-full bg-sky-100 flex items-center justify-center overflow-hidden"
                                                    onClick={() => {}}
                                                >
                                                    {post.user?.profileImageUrl ? (
                                                        <img src={post.user.profileImageUrl} alt={post.user.nickname} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Image
                                                            src={'/img/Butterfly.png'}
                                                            alt="Default Profile"
                                                            width={48}
                                                            height={48}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </button>
                                                <div className="grid gap-[2rem]">
                                                    <p className="text-[14rem] font-semibold text-gray-950">{post.user?.nickname || 'Name'}</p>
                                                    <div className="flex items-center gap-[8rem] text-[12rem]">
                                                        <p className="text-gray-700">{post.user?.userType || 'User Type'}</p>
                                                        <span className="text-gray-200">|</span>
                                                        <p className="text-gray-600">{dayjs(post.createdAt).fromNow()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <TextButton
                                                txt={isUserFollowing(post.user.id) ? "팔로잉" : "팔로우"}
                                                color={isUserFollowing(post.user.id) ? "retreative" : "primary"}
                                                onClick={() => handleFollowClick(String(post.user.id), isUserFollowing(post.user.id))}
                                            />
                                        </div>
                                        {post.imageUrl && (
                                            <PostImage src={post.imageUrl} alt="Post Image" />
                                        )}
                                        <p className="text-[16rem] leading-[24rem] text-gray-950 py-[8rem] px-[16rem]">{post.content}</p>
                                        <div className="flex gap-[8rem] flex-wrap px-[16rem] py-[12rem]">
                                            {EMOTION_TYPES.map((emotion) => {
                                                const reactions = ((post as any).reactions || (post as any).emotions) as { type: string; count: number }[] | undefined;
                                                const myReactions = (post as any).myReactions as string[] | undefined;
                                                const reactionData = reactions?.find((r) => r.type === emotion.type);
                                                const count = reactionData?.count || 0;
                                                const isSelected = myReactions?.includes(emotion.type) || false;
                                                return (
                                                    <Chips
                                                        key={emotion.type}
                                                        typeName={emotion.type}
                                                        imageSrc={emotion.icon}
                                                        imageAlt={emotion.label}
                                                        imagePosition="l"
                                                        text={count === 0 ? '' : `${count}`}
                                                        className={isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}
                                                        type="outline"
                                                        onclick={() => handleReactionClick(post.id, emotion.type as ReactionType)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}
