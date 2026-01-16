'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from 'components/appBar/page';
import { IconButton } from 'components/ui/button/page';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

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

    const tabs: { key: NotificationTab; label: string }[] = [
        { key: 'all', label: '전체' },
        { key: 'dailyShare', label: '하루공유' },
        { key: 'community', label: '커뮤니티' },
        { key: 'medical', label: '의료·후원' },
    ];

    const handleNotificationClick = (notification: Notification) => {
        // 읽음 처리
        setNotifications((prev) =>
            prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
        );
        // TODO: 해당 알림에 맞는 페이지로 이동
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
                title="알림"
            />

            {/* 탭 */}
            <div className="flex border-b border-gray-200 mt-[56px] overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`flex-shrink-0 px-[16rem] py-[12rem] text-center text-[14rem] font-medium whitespace-nowrap ${
                            activeTab === tab.key
                                ? 'text-primary-500 border-b-2 border-primary-500'
                                : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label} {counts[tab.key]}
                    </button>
                ))}
            </div>

            {/* 알림 목록 */}
            <ul>
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
                            <div className="w-[48rem] h-[48rem] rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                <Image
                                    src="/icon/Diary.svg"
                                    alt="알림"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-[8rem]">
                                    <p className="text-[14rem] font-semibold text-gray-950 truncate">
                                        {notification.title}
                                    </p>
                                    <span className="text-[12rem] text-gray-500 flex-shrink-0">
                                        {dayjs(notification.createdAt).fromNow()}
                                    </span>
                                </div>
                                <p className="text-[14rem] text-gray-600 mt-[4rem] line-clamp-2">
                                    {notification.description}
                                </p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
