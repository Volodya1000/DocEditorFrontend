import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { GetDocument,EditDocument } from '../services/documents'; 
import {selectCurrentId}from '../features/documents/documentSlice';
import { selectUserId } from '../features/auth/authSlice';


const DocumentEditor = ({navigateTo }) => {
    const userId = useSelector(selectUserId);
    const documentId = useSelector(selectCurrentId); 

    const [editorHtml, setEditorHtml] = useState('');
    const [documentTitle, setDocumentTitle] = useState('');

    useEffect(() => {
        const fetchDocument = async () => {
            const fetchedDocument = await GetDocument(documentId, userId);
            if (fetchedDocument) {
                setDocumentTitle(fetchedDocument.title);
                setEditorHtml(fetchedDocument.content);
                console.log('Измененный заголовок документа:', fetchedDocument.title);
            }
        };

        fetchDocument();
    }, [documentId, userId]);

    const handleSave = async () => {
        try {
            // Логируем все параметры перед вызовом функции
            console.log('Параметры для сохранения документа:');
            console.log('documentId:', documentId);
            console.log('userId:', userId);
            console.log('editorHtml:', editorHtml);
            console.log('documentTitle:', documentTitle);
    
            await EditDocument(documentId, userId, editorHtml, documentTitle);
            console.log('Документ успешно сохранен');
            navigateTo('read'); 
        } catch (error) {
            console.error('Ошибка при сохранении документа:', error);
        }
    };
    
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Редактор документа</h2>
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Название документа:
                    <input
                        type="text"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        placeholder="Введите название документа"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </label>
            </div>

            <ReactQuill value={editorHtml} onChange={setEditorHtml} />

            <div style={{ marginTop: '20px' }}>
                <button onClick={handleSave}>Сохранить</button>
                <button onClick={() => navigateTo('home')}>В главное меню</button>
            </div>
        </div>
    );
};

export default DocumentEditor;
