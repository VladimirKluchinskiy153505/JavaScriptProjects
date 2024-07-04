import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const clearLocalStorage = async () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        };

        clearLocalStorage();
    }, [navigate]);

    return <div>Logging out...</div>; // Optional: You can render a message while logging out.
};

export default Logout;