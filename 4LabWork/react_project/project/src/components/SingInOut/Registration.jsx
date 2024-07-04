// Registration.js
import React, { useState } from 'react';
import '../../styles/Registration.css'
import NavBar from "../NavBar";
const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
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

    const handleRegistration = async () => {
        if(formData.name.length < 5){
            setError('Name is to short');
            return;
        }
        if (formData.email.length < 5) {
            setError('Email is to short');
            return;
        }
        if (formData.phone.length < 5) {
            setError('PhoneNumber is to short');
            return;
        }
        if (formData.password.length < 5) {
            setError('Password is to short');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            // Send a POST request to your server for user registration
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Handle the response as needed (e.g., show success message, error handling)
            const result = await response.json();
            console.log(result);
                setResultMessage(result);
            // Optionally, you can navigate to a different page after successful registration
            // Example: navigate('/success-page');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <NavBar/>
            <h2>Registration Form</h2>
            <form className="registration-form">
                {/* Include form fields for name, email, phone, and password */}
                <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>ConfirmPassword:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                </div>
                <button type="button" onClick={handleRegistration}>
                    Register
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {resultMessage && <div className="result-message">{resultMessage.message}</div>}
        </div>
    );
};
export default Registration;