import React, { useState } from 'react';
import { registerUser } from '../services/users';
import { useDispatch } from 'react-redux';
import { setUserId } from '../features/auth/authSlice';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const Register = ({ navigateTo }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const dispatch = useDispatch(); 

    const handleRegister = async () => {
        try {
            const newUserId = await registerUser(userName, email, password);
            dispatch(setUserId(newUserId)); 
            console.log('Пользователь зарегистрирован с ID:', newUserId);
            localStorage.setItem('auth', true); 
            navigateTo('home'); 
        } catch (err) {
            const errorMessage = err.response?.data || 'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.';
            setError(errorMessage);
        }
    };

    return (
        <Container 
            maxWidth="sm" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
        >
            <Typography variant="h4" gutterBottom>
                Регистрация
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box display="flex" flexDirection="column" gap={2} width="100%">
                <TextField 
                    label="Имя пользователя" 
                    variant="outlined" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                />
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
                    onClick={handleRegister}
                >
                    Зарегистрироваться
                </Button>
            </Box>
            <Typography variant="body1">
                Уже есть аккаунт?{' '}
                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigateTo('login')}>
                    Войдите здесь
                </span>.
            </Typography>
        </Container>
    );
};

export default Register;
