import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../features/auth/authSlice';
import AddDocument from './AddDocument';
import DocumentList from './DocumentList';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = ({ navigateTo }) => {
    const userId = useSelector(selectUserId);

    return (
        <Container 
            maxWidth="lg" 
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <Typography variant="h4" gutterBottom>
                Главная страница
            </Typography>

            <AddDocument />

            <Box mt={2}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => navigateTo('startup')}
                >
                    Выйти
                </Button>
            </Box>

            <DocumentList navigateTo={navigateTo} />
        </Container>
    );
};

export default HomePage;
