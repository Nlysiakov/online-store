import '@fontsource-variable/inter';
import { AppShell, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

import Container from '@/App/components/ContainerCard/ContainerCard';
import Header from '@/App/components/Header/Header';
import { CartProvider } from '@/App/context/CartContext/CartProvider';

/**
 * Стартовая заглушка
 *
 * 1. Загрузить товары с API (адрес лежит в import.meta.env.VITE_API_URL, файл .env)
 *    Пока идёт загрузка - показывать лоадер вместо списка.
 * 2. Сделать шапку: название магазина + количество товаров и сумма в корзине
 *    Шапка прилипает к верху при прокрутке
 * 3. Popup корзины по клику на иконку с подробным составом заказа
 * 4. Карточка товара: кнопки '+' / '-' меняют число в инпуте,
 *    'Add to cart' кладёт товар в корзину, при наведении меняются стили.
 * 5. Состояние корзины реализуем через Context API (createContext + useContext).
 * 6. Тесты на React Testing Library.
 *
 * Файловую структуру внутри src/ придумайте сами: алиас `@/` указывает на src,
 * поэтому импорты не сломаются, куда бы вы ни положили файл.
 */

export default function App() {
    return (
        <CartProvider>
            <MantineProvider>
                <AppShell header={{ height: 59 }} bg="#F3F5FA" mx="auto">
                    <AppShell.Header maw="1440" mx="auto">
                        <Header />
                    </AppShell.Header>

                    <AppShell.Main mih="100vh" maw="1440" mx="auto">
                        <Container />
                    </AppShell.Main>
                </AppShell>
            </MantineProvider>
        </CartProvider>
    );
}
