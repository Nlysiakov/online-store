import { createContext } from 'react';

import { type ICartItem } from '@/App/models/types';

interface ICartContext {
    items: ICartItem[];
    addItem: (item: ICartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    total: number;
}

export const CartContext = createContext<ICartContext | null>(null);
