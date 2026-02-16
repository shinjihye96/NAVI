'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from 'components/appBar/page';
import { IconButton, TextButton } from 'components/ui/button/page';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { Tabs } from 'components/ui/tab/page';
import { useNotificationStore } from 'store/notificationStore';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type NotificationTab = 'all' | 'dailyShare' | 'community' | 'medical';

interface Notification {
    id: string;
    type: 'dailyShare' | 'community' | 'medical';
    title: string;
    description: string;
    createdAt: string;
    isRead: boolean;
}

// 임시 데이터 (백엔드 API 연동 전)
const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'dailyShare',
        title: '하루공유 100개 달성',
        description: '포도님의 소중한 하루를 100번 공유했어요. 되돌아 보는 시간을 가져보세요!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        isRead: false,
    },
    {
        id: '2',
        type: 'community',
        title: '새로운 댓글',
        description: '회원님의 게시글에 새로운 댓글이 달렸습니다.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        isRead: true,
    },
    {
        id: '3',
        type: 'dailyShare',
        title: '팔로우 알림',
        description: '하늘이님이 회원님을 팔로우하기 시작했습니다.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        isRead: true,
    },
    {
        id: '4',
        type: 'medical',
        title: '진료 예약 알림',
        description: '내일 오후 2시 진료 예약이 있습니다.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        isRead: false,
    },
    {
        id: '5',
        type: 'community',
        title: '인기 게시글',
        description: '회원님의 게시글이 인기 게시글로 선정되었습니다.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        isRead: true,
    },
];

export default function NotificationsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<NotificationTab>('all');
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

    // 안읽은 알림 개수를 스토어에 업데이트
    useEffect(() => {
        const unreadCount = notifications.filter((n) => !n.isRead).length;
        setUnreadCount(unreadCount);
    }, [notifications, setUnreadCount]);

    // 탭별 필터링
    const filteredNotifications = activeTab === 'all'
        ? notifications
        : notifications.filter((n) => n.type === activeTab);

    // 탭별 카운트
    const counts = {
        all: notifications.length,
        dailyShare: notifications.filter((n) => n.type === 'dailyShare').length,
        community: notifications.filter((n) => n.type === 'community').length,
        medical: notifications.filter((n) => n.type === 'medical').length,
    };

    const tabs = [
        { value: 'all', label: '전체', count: counts.all },
        { value: 'dailyShare', label: '하루공유', count: counts.dailyShare },
        { value: 'community', label: '커뮤니티', count: counts.community },
        { value: 'medical', label: '의료·후원', count: counts.medical },
    ];

    const handleNotificationClick = (notification: Notification) => {
        // 읽음 처리
        setNotifications((prev) =>
            prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
        );
        // TODO: 해당 알림에 맞는 페이지로 이동
    };

    const handleMarkAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    const hasUnread = notifications.some((n) => !n.isRead);

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
                {filteredNotifications.length === 0 ? (
                    <li className="py-[48rem] text-center text-gray-500">
                        알림이 없습니다
                    </li>
                ) : (
                    filteredNotifications.map((notification) => (
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
                                <p className={`text-[14rem] mt-[4rem] line-clamp-2 ${notification.isRead ? 'text-gray-500' : 'text-gray-950'}`}>{notification.description}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
