import React, { useState } from 'react';
import NavBar from "../NavBar";
import '../../styles/Login.css'
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        password: '',
    });
    const [resultMessage, setResultMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            // Send a POST request to your server for user login
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Handle the response as needed (e.g., show success message, store tokens, error handling)
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                // Save tokens to localStorage or sessionStorage
                localStorage.setItem('accessToken', result.token);
                localStorage.setItem('refreshToken', result.refreshtoken);
            }

            setResultMessage(result.message);

            // Optionally, you can navigate to a different page after successful login
            // Example: navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
        <NavBar/>
            <h2>Login Form</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="username" value={formData.username} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>

                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            {resultMessage && <div className="result-message">{resultMessage}</div>}
        </div>
    );
};

export default Login;