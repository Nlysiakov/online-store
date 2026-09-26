import { createContext } from 'react';

export interface TcartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface TcartContext {
    items: TcartItem[];
    addItem: (item: TcartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    total: number;
}

export const CartContext = createContext<TcartContext | null>(null);
