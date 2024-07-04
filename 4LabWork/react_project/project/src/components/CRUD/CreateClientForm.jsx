import React, {useEffect, useState} from 'react';
import NavBar from "../NavBar";

const CreateClientForm = () => {
    const [resultMessage, setResultMessage] = useState('');
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('accessToken')
    console.log("CF"+accessToken)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        card: '',
        //avatar: '',
    });

    const handleCreate = async () => {
        if (formData.name.length < 5) {
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
        if (formData.age < 0) {
            setError('Age must be positive');
            return;
        }
        try {
            // Send a PUT request to update client data
            const response = await fetch('http://localhost:3000/api/client/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            });
            console.log(JSON.stringify(formData))
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                console.log("Created")
            }
            setResultMessage(result.message);
        } catch (error) {
            console.error('Error during update request:', error);
            setError('Login failed. Please check your credentials.');
        }
    };
    //const [avatarFile, setAvatarFile] = useState(null);

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0]; // Получаем первый выбранный файл
    //     const updatedFormData = new FormData();
    //     updatedFormData.append('avatar', file);
    //     // Обновляем состояние formData
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         updatedFormData,
    //     }));
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <div>
            <NavBar/>
            <h2>Create Client Form</h2>
            {error && <div className="error-message">{error}</div>}
            <form>
                {/* Include form fields for name, email, phone, age, card, and avatar */}
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Card:</label>
                    <input type="text" name="card" value={formData.card} onChange={handleInputChange} />
                </div>

                {/*<div>*/}
                {/*    <label>Avatar:</label>*/}
                {/*    <input type="file" name="avatar" onChange={handleFileChange} />*/}
                {/*</div>*/}

                <button type="button" onClick={handleCreate}>
                    Create Client
                </button>
            </form>
            {resultMessage && <div className="result-message">{resultMessage}</div>}
        </div>
    );
};

export default CreateClientForm;