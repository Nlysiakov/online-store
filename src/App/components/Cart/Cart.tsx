import { Text, Flex, Image, Group, ActionIcon } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconMinus, IconPlus } from '@tabler/icons-react';

import { useCart } from '@/App/context/CartContext/useCart';
import CartEmpty from '@/App/Icons/cartEmpty.svg?react';

export default function Cart() {
    const { items, total, updateQuantity } = useCart();

    return (
        <Flex
            w={items.length === 0 ? 301 : 444}
            mih={250}
            mah={400}
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
                <Flex justify="center" align="center" direction="column" mt="lg">
                    <CartEmpty />
                    <Text c="#868E96" fz={16} fw={400} mt="lg">
                        Your cart is empty!
                    </Text>
                </Flex>
            ) : (
                <Flex direction="column" gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
                    {items.map((item) => (
                        <Flex
                            direction="row"
                            key={item.id}
                            gap="sm"
                            align="center"
                            w={396}
                            h={80}
                            style={{ borderBottom: '1px solid #DEE2E6' }}
                        >
                            <Image src={item.image} alt={item.name} w={64} h={64} fit="cover" />

                            <Flex direction="column" style={{ flex: 1 }}>
                                <Text c="black" fz={18} fw={600}>
                                    {item.name}
                                </Text>
                                <Flex justify="space-between">
                                    <Text c="black" fz={20} fw={600}>
                                        ${item.price * item.quantity}
                                    </Text>
                                    <Group gap="5">
                                        <ActionIcon
                                            w={30}
                                            h={30}
                                            bg="#DEE2E6"
                                            c="black"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        >
                                            <IconMinus height={12} width={12} />
                                        </ActionIcon>
                                        <Text h={30} w={15} ta={'center'} c="black">
                                            {item.quantity}
                                        </Text>
                                        <ActionIcon
                                            w={30}
                                            h={30}
                                            bg="#DEE2E6"
                                            c="black"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                        >
                                            <IconPlus height={12} width={12} />
                                        </ActionIcon>
                                    </Group>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                    <Flex
                        justify="space-between"
                        c="black"
                        w={396}
                        h={36}
                        style={{ borderTop: '1px solid #DEE2E6' }}
                    >
                        <Text fz={18} fw={600}>
                            Total
                        </Text>
                        <Text fz={18} fw={600}>
                            $ {total}
                        </Text>
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
}
