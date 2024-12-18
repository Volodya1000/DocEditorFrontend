import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: "пустой id"
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
        clearUserId(state) {
            state.userId = null;
        },
    },
});

export const { setUserId, clearUserId } = authSlice.actions;

export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
