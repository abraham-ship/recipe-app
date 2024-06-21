import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const endpoint = isLogin ? 'login' : 'register';
            const response = await axios.post(`http://localhost:5001/auth/${endpoint}`, {
                email,
                password,
            });

            if (response.data.token) {
                setCookie('access_token', response.data.token, { path: '/' });
                window.localStorage.setItem('access_token', response.data.token);
                window.localStorage.setItem('userID', response.data.userID);
                navigate('/');
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <p onClick={toggleMode} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </p>
            </form>
        </div>
    );
};

export default Auth;
