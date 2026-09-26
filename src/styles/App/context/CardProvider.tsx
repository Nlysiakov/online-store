import { type ReactNode, useState } from 'react';

import { CartContext, type TcartItem } from './CardContext';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<TcartItem[]>([]);

    const addItem = (item: TcartItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
                );
            }
            return [...prev, item];
        });
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, total, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
