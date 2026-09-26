import { Text, Button, Group, Flex } from '@mantine/core';
import { useState } from 'react';

import '@mantine/core/styles.css';
import Cart from './Cart';

export default function Header() {
    const [openCart, setOpenCart] = useState(false);

    const handleCartState = () => {
        setOpenCart((prev) => !prev);
    };

    return (
        <Group h="100%" justify="space-between" pos="relative">
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
            <Button w="144" h="44" bg="#54B46A" mr="md" onClick={handleCartState}>
                Cart
            </Button>
            {openCart && <Cart />}
        </Group>
    );
}
