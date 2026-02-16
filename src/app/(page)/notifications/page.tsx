'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AppBar from 'components/appBar/page';
import { IconButton, TextButton } from 'components/ui/button/page';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { Tabs } from 'components/ui/tab/page';
import { useNotificationStore } from 'store/notificationStore';
import { notificationsApi } from 'api/notifications';
import type { NotificationCategory, NotificationItem } from 'api/types';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type NotificationTab = 'all' | 'daily_share' | 'community' | 'medical_support';

export default function NotificationsPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<NotificationTab>('all');
    const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

    // 카테고리 쿼리 파라미터 (all이면 undefined)
    const categoryParam: NotificationCategory | undefined =
        activeTab === 'all' ? undefined : activeTab;

    // 알림 목록 조회
    const { data: notificationData } = useQuery({
        queryKey: ['notifications', activeTab],
        queryFn: () => notificationsApi.getAll({ category: categoryParam }),
    });

    // 읽지 않은 알림 수 조회
    const { data: unreadData } = useQuery({
        queryKey: ['notifications-unread-count'],
        queryFn: () => notificationsApi.getUnreadCount(),
    });

    // unreadData가 변경되면 스토어에 반영
    const totalUnread = unreadData?.total ?? 0;
    if (totalUnread !== useNotificationStore.getState().unreadCount) {
        setUnreadCount(totalUnread);
    }

    // 개별 알림 읽음 처리
    const readMutation = useMutation({
        mutationFn: (id: string) => notificationsApi.read(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
        },
    });

    // 모든 알림 읽음 처리
    const readAllMutation = useMutation({
        mutationFn: () => notificationsApi.readAll(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
        },
    });

    const notifications = notificationData?.items ?? [];

    // 탭별 읽지 않은 카운트
    const counts = {
        all: unreadData?.total ?? 0,
        daily_share: unreadData?.dailyShare ?? 0,
        community: unreadData?.community ?? 0,
        medical_support: unreadData?.medicalSupport ?? 0,
    };

    const tabs = [
        { value: 'all', label: '전체', count: counts.all },
        { value: 'daily_share', label: '하루공유', count: counts.daily_share },
        { value: 'community', label: '커뮤니티', count: counts.community },
        { value: 'medical_support', label: '의료·후원', count: counts.medical_support },
    ];

    const handleNotificationClick = (notification: NotificationItem) => {
        if (!notification.isRead) {
            readMutation.mutate(notification.id);
        }
        // TODO: referenceId/referenceType 기반으로 해당 페이지 이동
    };

    const handleMarkAllAsRead = () => {
        readAllMutation.mutate();
    };

    const hasUnread = totalUnread > 0;

    return (
        <div className="min-h-[calc(100vh-132rem)] bg-base-wf">
            <AppBar
                left={
                    <IconButton
                        iconName="ArrowLeft"
                        size="l"
                        color="tertiary"
                        onClick={() => router.back()}
                    />
                }
                title="알림"
                right={
                    hasUnread ? (
                        <TextButton
                            txt="모두 읽기"
                            color="primary"
                            onClick={handleMarkAllAsRead}
                        />
                    ) : null
                }
                className={"sticky top-0"}
            />
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={(value) => setActiveTab(value as NotificationTab)}
            />
            <ul className='pt-[24px]'>
                {notifications.length === 0 ? (
                    <li className="py-[48rem] text-center text-gray-500">
                        알림이 없습니다
                    </li>
                ) : (
                    notifications.map((notification) => (
                        <li
                            key={notification.id}
                            className={`flex items-start gap-[12rem] px-[16rem] py-[16rem] border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                !notification.isRead ? 'bg-primary-50' : ''
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <div className="w-[40rem] h-[40rem] rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 bg-[#D4EAFF]">
                                <Image
                                    src="/img/icon/Write-Image.png"
                                    alt="알림"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-[8rem]">
                                    <p className={`text-[14rem] font-semibold truncate ${notification.isRead ? 'text-gray-500' : 'text-gray-950'}`}>{notification.title}</p>
                                    <span className="text-[12rem] text-gray-500 flex-shrink-0">{dayjs(notification.createdAt).fromNow()}</span>
                                </div>
                                <p className={`text-[14rem] mt-[4rem] line-clamp-2 ${notification.isRead ? 'text-gray-500' : 'text-gray-950'}`}>{notification.message}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
