import '@fontsource-variable/inter';
import { MantineProvider, createTheme } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';

// Стили библиотеки подключаются ДО собственных, чтобы их можно было переопределить
import '@mantine/core/styles.css';
import '@/App/styles/index.css';

const theme = createTheme({
    fontFamily: 'Inter Variable, sans-serif',
    fontWeights: { bold: '600' },
    headings: {
        fontFamily: 'Inter Variable, sans-serif',
        fontWeight: '600',
    },
});

const container = document.getElementById('root');

if (!container) {
    throw new Error('Не найден элемент #root - проверьте public/index.html');
}

createRoot(container).render(
    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="light">
            <App />
        </MantineProvider>
    </StrictMode>,
);
