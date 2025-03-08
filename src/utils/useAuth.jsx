
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/user/login');
        }

        try {
            const decodedJwt = jwtDecode(token);
            setLoginUserEmail(decodedJwt.email);
        } catch (err) {
            console.log(err);
            navigate('/user/login');
        }
    }, [navigate]);

    return loginUserEmail;
};

export default useAuth;