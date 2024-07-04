import React, {useEffect, useState} from 'react';
import NavBar from "../NavBar";

const UpdateLessonForm = () => {
    const [resultMessage, setResultMessage] = useState('');
    const [error, setError] = useState('');
    const lessonId = localStorage.getItem('lessonId')
    const accessToken = localStorage.getItem('accessToken')

    const [formData, setFormData] = useState({
        lessonID: lessonId,
        subject_name: '',
        price: '',
        date: '',
        gym: ''
    });
    useEffect(() => {
        // Fetch client data by ID when component mounts
        const fetchLessonData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/lesson/show", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({lessonID:lessonId}),
                });
                // const response = await axios.get(`http://localhost:3000/api/client/show`);
                const result = await response.json();
                console.log(result);
                const lessonData = result.response; // Assuming the API response structure

                // Update the form data with client data
                setFormData({
                    lessonID: lessonId,
                    subject_name: lessonData.subject_name,
                    price: lessonData.price,
                    date: lessonData.date,
                    gym: lessonData.gym,
                });
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchLessonData();
    }, [lessonId]);
    const handleUpdate = async () => {
        if (formData.subject_name.length < 5) {
            setError('Name is to short');
            return;
        }
        if (formData.price < 0) {
            setError('Age must be positive');
            return;
        }
        try {
            // Send a PUT request to update client data
            const response = await fetch('http://localhost:3000/api/lesson/update', {
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
                console.log("Updated")
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
            <h2>Update Lesson Form</h2>
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
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                </div>

                <div>
                    <label>Gym:</label>
                    <input type="text" name="gym" value={formData.gym} onChange={handleInputChange} />
                </div>

                <button type="button" onClick={handleUpdate}>
                    Update Lesson
                </button>
            </form>
            {resultMessage && <div className="result-message">{resultMessage}</div>}
        </div>
    );
};

export default UpdateLessonForm;