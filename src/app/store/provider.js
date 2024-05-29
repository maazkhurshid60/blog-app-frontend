"use client"

import { Provider } from "react-redux";
import { store } from './store'
import { Navigation } from '@/components/index'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }) {

    return <Provider store={store}>
        <Toaster />
        <Navigation />
        {children}
    </Provider>
}