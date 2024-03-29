import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './components/context/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AppProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AppProvider>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
