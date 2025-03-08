
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });
            const jsonData = await response.json();
            localStorage.setItem('token', jsonData.token);
            alert(jsonData.message);
            navigate('/');
        } catch (err) {
            console.log(err);
            alert('ログイン失敗');
        }
    };

    return (
        <div>
            <h1 className='page-title'>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name='email'
                    placeholder='メールアドレス'
                    required
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    name='password'
                    placeholder='パスワード'
                    required
                />
                <button type='submit'>ログイン</button>
            </form>
        </div>
    );
};

export default Login;