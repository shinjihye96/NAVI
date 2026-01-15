import { emotionTypesApi, EmotionTypeInfo } from "api";
import RegistDailyClient from "./_RegistDailyClient";

const gradientMap: Record<string, { from: string; to: string }> = {
    sun: { from: '#A8EEF7', to: '#E1F0FF' },
    sun_cloud: { from: '#FFF4E1', to: '#FCE4A6' },
    cloud: { from: '#E8EAF6', to: '#C5CAE9' },
    rain: { from: '#BBDEFB', to: '#64B5F6' },
    lightning: { from: '#D1C4E9', to: '#7E57C2' },
};

export interface WeatherOption extends EmotionTypeInfo {
    gradientFrom: string;
    gradientTo: string;
}

async function getEmotionTypes(): Promise<WeatherOption[]> {
    try {
        const data = await emotionTypesApi.getAll();

        return data.map((item) => ({
            ...item,
            gradientFrom: gradientMap[item.type]?.from || '#E8EAF6',
            gradientTo: gradientMap[item.type]?.to || '#C5CAE9',
        }));
    } catch {
        return [];
    }
}

export default async function RegistDaily() {
    const emotionTypes = await getEmotionTypes();

    return <RegistDailyClient initialEmotionTypes={emotionTypes} />;
}
