import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentId, selectDocuments, addDocument } from '../features/documents/documentSlice';
import { GetAllDocuments } from '../services/documents';
import { selectUserId } from '../features/auth/authSlice';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';

const DocumentList = ({ navigateTo }) => {
    const dispatch = useDispatch();
    const [documents, setDocuments] = useState([]);
    const userId = useSelector(selectUserId);
    const allDocuments = useSelector(selectDocuments); 

    const handleRowClick = (doc) => {
        dispatch(setCurrentId(doc.id)); 
        navigateTo('read');
    };

    const fetchDocuments = async () => {
        try {
            const docs = await GetAllDocuments(userId);
            console.log('Получены документы:', docs); 
            if (Array.isArray(docs)) {
                setDocuments(docs);
                docs.forEach(doc => {
                    dispatch(addDocument(doc));
                });
            } else {
                console.error('Полученные данные не являются массивом:', docs);
            }
        } catch (error) {
            console.error('Ошибка при получении документов:', error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [userId]);

    useEffect(() => {
        setDocuments(allDocuments);
        console.log('Количество документов:', allDocuments.length);
    }, [allDocuments]);

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            {documents.length === 0 ? (
                <Alert severity="info" style={{ textAlign: 'center' }}>
                    Нет доступных документов
                </Alert>
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Список документов
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название документа</TableCell>
                                    <TableCell>Роль пользователя</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {documents.map((doc) => (
                                    <TableRow 
                                        key={doc.id} 
                                        onClick={() => handleRowClick(doc)} 
                                        style={{ cursor: 'pointer' }}
                                        hover
                                    >
                                        <TableCell>{doc.title}</TableCell>
                                        <TableCell>{doc.userRoleIdDocument}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Container>
    );
};

export default DocumentList;


