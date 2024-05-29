import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '@/app/store/authSlice';
import BlogReducer from '@/app/store/blogSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        blog: BlogReducer,
    }
});