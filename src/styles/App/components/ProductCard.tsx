import { Group, Button, Text, Flex, Image, Card } from '@mantine/core';
import { useState } from 'react';

import { useCart } from '../context/useCart';
import { type Tproduct } from '../models/types';

interface Props {
    item: Tproduct;
}

export default function ProductCard({ item }: Props) {
    const { addItem } = useCart();
    const [qty, setQty] = useState(1);

    return (
        <Card key={item.id}>
            <Image src={item.image} alt={item.name} />
            <Flex justify="space-between" direction="column" gap="10">
                <Flex justify="space-between">
                    <Text fz="18">{item.name}</Text>
                    <Group gap="5">
                        <Button
                            bg="#DEE2E6"
                            c="black"
                            onClick={() => setQty((q) => Math.max(q - 1))}
                            disabled={qty === 1}
                        >
                            -
                        </Button>
                        <Text c="black">{qty}</Text>
                        <Button bg="#DEE2E6" c="black" onClick={() => setQty((q) => q + 1)}>
                            +
                        </Button>
                    </Group>
                </Flex>
                <Flex justify="space-between">
                    <Text>{`$ ${item.price}`}</Text>
                    <Button
                        w="214"
                        h="44"
                        bg="#E7FAEB"
                        c="#3B944E"
                        onClick={() =>
                            addItem({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                quantity: qty,
                            })
                        }
                    >
                        Add to Cart
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
}
