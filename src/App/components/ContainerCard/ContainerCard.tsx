import { Text, Title, SimpleGrid, Container, Loader, Flex } from '@mantine/core';
import '@mantine/core/styles.css';

import ProductCard from '@/App/components/ProductCard/ProductCard';
import { useProduct } from '@/App/hooks/useProducts';

export default function ContainerCard() {
    const { data, loading, isError } = useProduct();

    if (loading) {
        return (
            <Flex justify="center" py="xl">
                <Loader color="#54B46A" />
            </Flex>
        );
    }

    if (isError) return <Text c="black">{isError}</Text>;

    return (
        <Container size={1280} px="md" pb={40}>
            <Title c="black" mt={40}>
                Catalog
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md" mt={40}>
                {data.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </SimpleGrid>
        </Container>
    );
}
