import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const StartupPage = ({ navigateTo }) => {
    return (
        <Container 
            maxWidth="sm" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to the document editor system
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigateTo('register')}
                >
                    Register
                </Button>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => navigateTo('login')}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default StartupPage;


