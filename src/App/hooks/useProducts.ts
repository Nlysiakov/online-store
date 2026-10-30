import { useState, useEffect } from 'react';

import { type IProduct } from '../models/types';

const API = import.meta.env.VITE_API_URL;

export const useProduct = () => {
    const [data, setData] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('HTTP Error');
                }
                const responseJson = (await response.json()) as IProduct[];
                setData(responseJson);
            } catch (err) {
                console.error('Ошибка: ', err);
                setIsError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };
        void fetchData();
    }, []);

    return { data, loading, isError };
};
