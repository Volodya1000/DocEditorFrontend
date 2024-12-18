import React, { useEffect, useState } from 'react';
import { GetDocument, RemoveDocument } from '../services/documents';
import { useSelector } from 'react-redux';
import { selectUserId } from '../features/auth/authSlice';
import { selectCurrentId } from '../features/documents/documentSlice';
import { Container, Typography, Button, Box, Alert } from '@mui/material';

const ReadDocument = ({ navigateTo }) => {
    const userId = useSelector(selectUserId);
    const documentId = useSelector(selectCurrentId); 

    const [document, setDocument] = useState(null);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const fetchedDocument = await GetDocument(documentId, userId);
                setDocument(fetchedDocument);
            } catch (err) {
                setError('Ошибка при загрузке документа. Пожалуйста, попробуйте еще раз.');
            }
        };

        fetchDocument();
    }, [documentId, userId]);

    // Приводим userRoleIdDocument к нижнему регистру
    const userRoleId = document?.userRoleIdDocument?.toLowerCase();

    // Проверяем условия для отображения кнопок
    const canEdit = userRoleId === 'admin' || userRoleId === 'editor';
    const canAccessSettings = userRoleId === 'admin' || userRoleId === 'creator';
    const canDelete = userRoleId === 'admin';

    // Функция для удаления документа
    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот документ?')) {
            try {
                await RemoveDocument(documentId, userId);
                navigateTo('home'); // Перенаправляем пользователя на главную страницу после удаления
            } catch (error) {
                setDeleteError('Не удалось удалить документ. Пожалуйста, попробуйте еще раз.');
            }
        }
    };

    return (
        <Container 
            maxWidth="md" 
            style={{ padding: '20px', margin: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                {document?.title || 'Заголовок документа'}
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {deleteError && <Alert severity="error">{deleteError}</Alert>}
            <Box 
                sx={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    padding: 2, 
                    minHeight: '200px' 
                }}
                dangerouslySetInnerHTML={{ __html: document?.content || '<p>Содержимое документа отсутствует.</p>' }} 
            />
            <Box mt={2}>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => navigateTo('home')}
                >
                    В главное меню
                </Button>
                {canEdit && (
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => navigateTo('editor')} 
                        sx={{ marginLeft: 1 }}
                    >
                        Редактировать документ
                    </Button>
                )}
                {canAccessSettings && (
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => navigateTo('doc_settings')} 
                        sx={{ marginLeft: 1 }}
                    >
                        Настройки документа
                    </Button>
                )}
                {canDelete && (
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleDelete} 
                        sx={{ marginLeft: 1 }}
                    >
                        Удалить документ
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default ReadDocument;
