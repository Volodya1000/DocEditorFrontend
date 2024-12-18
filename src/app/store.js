import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import documentReducer from '../features/documents/documentSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        documents: documentReducer,
    },
});

export default store;
