import React, {useState} from 'react';
import NavBar from "../NavBar";
const CreateLessonForm = () => {
    const [resultMessage, setResultMessage] = useState('');
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('accessToken')
    console.log("CF"+accessToken)
    const [formData, setFormData] = useState({
        subject_name: '',
        price: '',
        date:'',
        gym: ''
    });

    const handleCreate = async () => {
        if (formData.subject_name.length < 4) {
            setError('Name is to short');
            return;
        }
        if (formData.price.length < 0) {
            setError('Price cant be negative');
            return;
        }

        try {
            // Send a PUT request to update client data
            const response = await fetch('http://localhost:3000/api/lesson/store', {
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
                    <label>SubjectName:</label>
                    <input type="text" name="subject_name" value={formData.subject_name} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Data:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Gym:</label>
                    <input type="text" name="gym" value={formData.gym} onChange={handleInputChange} />
                </div>

                <button type="button" onClick={handleCreate}>
                    Create Client
                </button>
            </form>
            {resultMessage && <div className="result-message">{resultMessage}</div>}
        </div>
    );
};

export default CreateLessonForm;