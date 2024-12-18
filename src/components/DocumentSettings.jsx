import React, { useState, useEffect } from 'react';
import UserRoleSettings from './UserRoleSettings';
import ShowUsersNotInDocument from './ShowUsersNotInDocument';
import { AddUserToDocument, GetDocument, GetUsersWithoutRoleInDocument, RemoveUserFromDocument } from '../services/documents';
import { useSelector } from 'react-redux';
import { selectCurrentId } from '../features/documents/documentSlice';
import { selectUserId } from '../features/auth/authSlice';
import { Container, Typography, Box, Button, Grid } from '@mui/material';

const DocumentSettings = ({ navigateTo }) => {
    const [readers, setReaders] = useState([]);
    const [editors, setEditors] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [usersWithoutRole, setUsersWithoutRole] = useState([]);
    const userId = useSelector(selectUserId);
    const documentId = useSelector(selectCurrentId);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const document = await GetDocument(documentId, userId);
                if (document && document.otherUserRoles) {
                    categorizeUsersByRole(document.otherUserRoles);
                }
                await updateUsersWithoutRole();
            } catch (error) {
                console.error('Ошибка при получении документа:', error);
            }
        };
        fetchDocument();
    }, [documentId, userId]);

    const categorizeUsersByRole = (otherUserRoles) => {
        otherUserRoles.forEach(userRole => {
            const user = userRole;
            switch (userRole.roleName.toLowerCase()) {
                case 'viewer':
                    setReaders(prev => prev.some(u => u.id === user.id) ? prev : [...prev, user]);
                    break;
                case 'editor':
                    setEditors(prev => prev.some(u => u.id === user.id) ? prev : [...prev, user]);
                    break;
                case 'admin':
                    setAdmins(prev => prev.some(u => u.id === user.id) ? prev : [...prev, user]);
                    break;
                default:
                    break;
            }
        });
    };

    const updateUsersWithoutRole = async () => {
        console.log("Вызвано updateUsersWithoutRole:");
        const usersData = await GetUsersWithoutRoleInDocument(documentId);
        
        // Удаляем дубликаты пользователей
        const uniqueUsers = Array.from(new Set(usersData.map(user => user.id)))
            .map(id => usersData.find(user => user.id === id));
        
        setUsersWithoutRole(uniqueUsers);
    };

    const addUser = async (user, role) => {
        if(role==="") return;
        await AddUserToDocument(user.id, documentId, role, userId);
        if (role === 'viewer') setReaders(prev => [...prev, user]);
        else if (role === 'editor') setEditors(prev => [...prev, user]);
        else if (role === 'admin') setAdmins(prev => [...prev, user]);
        await updateUsersWithoutRole(); // Refresh users without roles
    };

    const getUserId = (user) => {
        return user.userId || user.id ;
    };

    const removeUserFromList = async (user) => {
        const changedUserId=getUserId(user);
        
        console.log("changedUserId:", changedUserId);
        await RemoveUserFromDocument(changedUserId, documentId, userId);
        setReaders(prev => prev.filter(u => u.id !== user.id));
        setEditors(prev => prev.filter(u => u.id !== user.id));
        setAdmins(prev => prev.filter(u => u.id !== user.id));
        updateUsersWithoutRole(); 
    };

    return (
        <Container maxWidth="lg" style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Настройки документов
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box>
                        <UserRoleSettings role="Читатели" users={readers} removeUser={removeUserFromList} />
                        <UserRoleSettings role="Редакторы" users={editors} removeUser={removeUserFromList} />
                        <UserRoleSettings role="Администраторы" users={admins} removeUser={removeUserFromList} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ShowUsersNotInDocument addUser={addUser} usersWithoutRole={usersWithoutRole} />
                </Grid>
            </Grid>
            <Box mt={2}>
               
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => navigateTo('read')} 
                    style={{ marginLeft: '10px' }}
                >
                    Назад
                </Button>
            </Box>
        </Container>
    );
};

export default DocumentSettings;
