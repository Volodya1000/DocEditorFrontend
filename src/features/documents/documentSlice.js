import { createSlice } from '@reduxjs/toolkit';

const documentSlice = createSlice({
    name: 'documents',
    initialState: {
        documents: [],
        currentId: null,
    },
    reducers: {
        addDocument: (state, action) => {
            // Проверка на уникальность ID (если это необходимо)
            const exists = state.documents.some(doc => doc.id === action.payload.id);
            if (!exists) {
                state.documents.push(action.payload);
            }
        },
        setCurrentId: (state, action) => {
            state.currentId = action.payload;
        },
        resetCurrentId: (state) => {
            state.currentId = null;
        },
    },
});

// Экспортируем действия
export const { addDocument, setCurrentId, resetCurrentId } = documentSlice.actions;

// Селекторы для получения данных из состояния
export const selectDocuments = (state) => state.documents.documents;
export const selectCurrentId = (state) => state.documents.currentId;

// Селектор для получения документа по currentId
export const selectDocumentById = (state, id) =>
    state.documents.documents.find(doc => doc.id === id);

// Экспортируем редьюсер
export default documentSlice.reducer;

