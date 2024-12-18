import React, { useState } from 'react';
import { loginUser } from '../services/users';
import { useDispatch } from 'react-redux';
import { setUserId } from '../features/auth/authSlice';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const Login = ({ navigateTo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const userData = await loginUser(email, password);
            localStorage.setItem('auth', true); 
            dispatch(setUserId(userData.id)); 
            console.log('Пользователь вошел с ID:', userData.id);
            navigateTo('home'); 
        } catch (error) {
            setError(error.message); 
        }
    };

    return (
        <Container 
            maxWidth="sm" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
        >
            <Typography variant="h4" gutterBottom>
                Вход
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box display="flex" flexDirection="column" gap={2} width="100%">
                <TextField 
                    label="Электронная почта" 
                    variant="outlined" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField 
                    label="Пароль" 
                    variant="outlined" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleLogin}
                >
                    Войти
                </Button>
            </Box>
            <Typography variant="body1">
                Нет аккаунта?{' '}
                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigateTo('register')}>
                    Зарегистрируйтесь здесь
                </span>.
            </Typography>
        </Container>
    );
};

export default Login;
