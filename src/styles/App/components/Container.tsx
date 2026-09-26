import { Text, Title, Group, SimpleGrid } from '@mantine/core';
import '@mantine/core/styles.css';
import { useEffect, useState } from 'react';

import { type Tproduct } from '../models/types';

import ProductCard from './ProductCard';

const API = import.meta.env.VITE_API_URL;

export default function Container() {
    const [data, setData] = useState<Tproduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await fetch(API);
                if (!responce.ok) {
                    throw new Error('HTTP Error');
                }
                const responceJson = (await responce.json()) as Tproduct[];
                setLoading(false);
                setData(responceJson);
            } catch (err) {
                console.error('Ошибка: ', err);
                setIsError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };
        void fetchData();
    }, []);

    if (loading) return <Text c="black">Loading...</Text>;

    if (isError) return <Text c="black">{isError}</Text>;

    return (
        <Group>
            <Title c="black" mt={40}>
                Catalog
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md" mt={40}>
                {data.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </SimpleGrid>
        </Group>
    );
}
