import { Group, Button, Text, Flex, Image, Card } from '@mantine/core';
import { useState } from 'react';

import { useCart } from '../context/useCart';
import CartIcon from '../Icons/cart.svg?react';
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
                    <Text fz="18" fw={600}>
                        {item.name}
                    </Text>
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
                <Flex justify="space-between" align="center">
                    <Flex justify="center" align="center" flex={1}>
                        <Text fz={20} fw={600}>{`$ ${item.price}`}</Text>
                    </Flex>
                    <Button
                        rightSection={<CartIcon width={20} height={20} />}
                        w="204"
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
