import { Text, Button, Group, Flex, Box } from '@mantine/core';
import { useState } from 'react';

import '@mantine/core/styles.css';
import { useCart } from '@/App/context/CartContext/useCart';
import CartIcon from '@/App/Icons/cartWhite.svg?react';

import Cart from '../Cart/Cart';

export default function Header() {
    const [openCart, setOpenCart] = useState(false);
    const { items } = useCart();

    const handleCartState = () => {
        setOpenCart((prev) => !prev);
    };

    return (
        <Group h="100%" justify="space-between" pos="relative" pl={12}>
            <Group w="209" h="33">
                <Group bg="#F7F7F7" bdrs="31" h="100%">
                    <Flex align="center" pl="md" justify="center" h="100%" w="109">
                        <Text c="black" fz="22" fw="600">
                            Vegetable
                        </Text>
                    </Flex>
                    <Flex align="center" justify="center" h="33" w="80" bg="green" bdrs="21">
                        <Text fz="20" fw="500">
                            SHOP
                        </Text>
                    </Flex>
                </Group>
            </Group>
            <Button
                w="144"
                h="44"
                bg="#54B46A"
                mr="md"
                fz={16}
                fw={600}
                onClick={handleCartState}
                rightSection={<CartIcon />}
            >
                {items.length > 0 && (
                    <Box pos={'relative'} w={20} h={20} bdrs="50%" bg="white" mr="xs">
                        <Box pos={'absolute'} h={34} w={14} top={-3} left={3.33} fz={23} c="black">
                            {items.length}
                        </Box>
                    </Box>
                )}
                Cart
            </Button>
            {openCart && <Cart />}
        </Group>
    );
}
