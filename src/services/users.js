import axiosInstance from "./axiosInstance";

export const registerUser = async (userName, email, password) => {
    try {
        const response = await axiosInstance.post('/register', {
            userName,
            email,
            password,
        });

        return response.data; 
    } catch (error) {
        console.error('Error registering user:', error.message);

        
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error details:', error);
        }

        throw error; 
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', {
            email,
            password,
        });

        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed. Please check your input.');
    }
};
