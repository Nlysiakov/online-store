// import { MantineProvider } from '@mantine/core';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { CartProvider } from './App/context/CartContext/CartProvider';
import { useCart } from './App/context/CartContext/useCart';
import { useProduct } from './App/customHooks/useProducts';

import type { ICartItem } from './App/models/types';

// import App from '@/App';

/**
 * Это пример теста
 * Компоненты Mantine нужно оборачивать в MantineProvider, иначе они упадут:
 * удобно вынести такую обёртку в отдельный хелпер renderWithProviders()
 */
// describe('App', () => {
//     it('отображает название магазина', () => {
//         render(
//             <MantineProvider>
//                 <App />
//             </MantineProvider>,
//         );

//         expect(screen.getByRole('heading', { name: /магазин овощей/i })).toBeInTheDocument();
//     });
// });

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

const potato: ICartItem = {
    id: 1,
    name: 'Potato - 1 Kg',
    price: 22,
    image: '',
    quantity: 1,
};

const apple: ICartItem = {
    id: 2,
    name: 'Apple - 1 Kg',
    price: 72,
    image: '',
    quantity: 1,
};

describe('useCart', () => {
    it('Начинает с пустой корзиной', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        expect(result.current.items).toEqual([]);
        expect(result.current.total).toBe(0);
    });

    it('Добавляет новый товар', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem({ ...potato, quantity: 2 });
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]).toEqual({ ...potato, quantity: 2 });
    });

    it('Увеличение кол-ва при повторном добавлении', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem({ ...potato, quantity: 2 });
        });
        act(() => {
            result.current.addItem({ ...potato, quantity: 3 });
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]).toEqual({ ...potato, quantity: 5 });
    });

    it('Добавляет 2 разных товара', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(potato);
        });
        act(() => {
            result.current.addItem(apple);
        });

        expect(result.current.items).toHaveLength(2);
    });

    it('Удаляет товар по id', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(potato);
            result.current.addItem(apple);
        });

        act(() => {
            result.current.removeItem(1);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]?.id).toBe(2);
    });

    it('Обновляет кол-во товара', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem({ ...potato, quantity: 2 });
        });
        act(() => {
            result.current.updateQuantity(1, 5);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]?.quantity).toBe(5);
    });

    it('Удаляет товар при quantity<0', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(potato);
        });
        act(() => {
            result.current.updateQuantity(1, 0);
        });

        expect(result.current.items).toEqual([]);
    });

    it('total считает правильно', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem({ ...potato, quantity: 2 });
            result.current.addItem({ ...apple, quantity: 1 });
        });

        expect(result.current.total).toBe(44 + 72);
    });

    it('Бросает ошибку вне провайдера', () => {
        expect(() => renderHook(() => useCart())).toThrow(
            'useCart must be used within CartProvider',
        );
    });
});

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('useProducts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('возвращает данные при успехе', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () =>
                Promise.resolve([{ id: 1, name: 'Potato', price: 22, image: '', category: '' }]),
        });

        const { result } = renderHook(() => useProduct());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toHaveLength(1);
        expect(result.current.isError).toBeNull();
    });

    it('возвращает ошибку при HTTP Error', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
        });

        const { result } = renderHook(() => useProduct());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.isError).toBe('HTTP Error');
        expect(result.current.data).toEqual([]);
    });

    it('возвращает ошибку при сетевой ошибке', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network'));

        const { result } = renderHook(() => useProduct());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.isError).toBe('Network');
    });
});
