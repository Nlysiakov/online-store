import { Text, Flex, Image, Group, Button } from '@mantine/core';
import '@mantine/core/styles.css';

import { useCart } from '../context/useCart';

export default function Cart() {
    const { items, total, updateQuantity } = useCart();

    return (
        <Flex
            w={444}
            mih={200}
            mah={500}
            direction="column"
            pos="absolute"
            bg="#FFFFFF"
            bd="1px solid #21252914"
            right={0}
            top={80}
            bdrs="lg"
            p="md"
            gap="sm"
        >
            {items.length === 0 ? (
                <Text c="black">Your cart is empty!</Text>
            ) : (
                <Flex direction="column" gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
                    {items.map((item) => (
                        <Flex direction="row" key={item.id} gap="sm" align="center" w={396} h={80}>
                            <Image src={item.image} alt={item.name} w={64} h={64} fit="cover" />

                            <Flex direction="column" style={{ flex: 1 }}>
                                <Text c="black">{item.name}</Text>
                                <Flex justify="space-between">
                                    <Text c="black">${item.price * item.quantity}</Text>
                                    <Group gap="5">
                                        <Button
                                            bg="#DEE2E6"
                                            c="black"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </Button>
                                        <Text c="black">{item.quantity}</Text>
                                        <Button
                                            bg="#DEE2E6"
                                            c="black"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </Button>
                                    </Group>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            )}
            <Flex
                justify="space-between"
                c="black"
                w={396}
                h={36}
                style={{ borderTop: '1px solid black' }}
            >
                <Text>Total</Text>
                <Text>$ {total}</Text>
            </Flex>
        </Flex>
    );
}
