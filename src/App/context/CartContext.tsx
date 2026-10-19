import { createContext } from 'react';

import { type IProduct } from '@/App/models/types';

export interface ICartItem extends IProduct {
    quantity: number;
}

interface ICartContext {
    items: ICartItem[];
    addItem: (item: ICartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    total: number;
}

export const CartContext = createContext<ICartContext | null>(null);
