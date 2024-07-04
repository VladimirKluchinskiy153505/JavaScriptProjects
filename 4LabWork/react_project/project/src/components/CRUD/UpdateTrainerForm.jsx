import React, {useEffect, useState} from 'react';
import NavBar from "../NavBar";
const UpdateTrainerForm = () => {
    const [resultMessage, setResultMessage] = useState('');
    const [error, setError] = useState('');
    // console.log("UF"+location.state.clientId)
    // console.log("UF"+location.state.accessToken)
    const trainerId = localStorage.getItem('trainerId')
    const accessToken = localStorage.getItem('accessToken')
    const [formData, setFormData] = useState({
        trainerID: trainerId,
        name: '',
        designation: '',
        salary: '',
        email: '',
        phone: '',
        age: '',
    });
    useEffect(() => {
        // Fetch client data by ID when component mounts
        const fetchTrainerData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/trainer/show", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({trainerID:trainerId}),
                });
                // const response = await axios.get(`http://localhost:3000/api/client/show`);
                const result = await response.json();
                console.log(result);
                const trainerData = result.response; // Assuming the API response structure

                // Update the form data with client data
                setFormData({
                    trainerID: trainerId,
                    name: trainerData.name,
                    designation: trainerData.designation,
                    salary: trainerData.salary,
                    email: trainerData.email,
                    phone: trainerData.phone,
                    age: trainerData.age,
                });
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchTrainerData();
    }, [trainerId]);
    const handleUpdate = async () => {
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
            const response = await fetch('http://localhost:3000/api/trainer/update', {
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
            <h2>Update Trainer Form</h2>
            {error && <div className="error-message">{error}</div>}
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Designation:</label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Salary:</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} />
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

                <button type="button" onClick={handleUpdate}>
                    Update Trainer
                </button>
            </form>
            {resultMessage && <div className="result-message">{resultMessage}</div>}
        </div>
    );
};
export default UpdateTrainerForm;