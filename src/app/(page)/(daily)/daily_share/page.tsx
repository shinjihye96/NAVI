import { dailySharesApi } from "api";
import DailyShareClient from "./_DailyShareClient";

async function getInitialData() {
    try {
        const [myDailyResponse, dailyListResponse] = await Promise.all([
            dailySharesApi.checkTodayShare(),
            dailySharesApi.getAll({ sortBy: 'oldest' }),
        ]);

        return {
            myDaily: myDailyResponse.hasShared && myDailyResponse.dailyShare ? myDailyResponse.dailyShare : null,
            dailyList: dailyListResponse.items,
        };
    } catch (e) {
        console.error('Failed to fetch initial data:', e);
        return {
            myDaily: null,
            dailyList: [],
        };
    }
}

export default async function DailyShare() {
    const { myDaily, dailyList } = await getInitialData();

    return (
        <DailyShareClient
            initialMyDaily={myDaily}
            initialDailyList={dailyList}
        />
    );
}
