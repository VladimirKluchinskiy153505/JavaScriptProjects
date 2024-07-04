import React from 'react';
import { useNavigate } from 'react-router-dom'
const UpdateTrainerButton = ({trainerId, accessToken}) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        // Переход на страницу UpdateForm с передачей параметров
        //console.log('reloadFunction:', reloadFunction);
        localStorage.setItem('trainerId',trainerId)
        localStorage.setItem('accessToken', accessToken)
        navigate('update/');
    };

    return (
        <div>
            {/* Ваша кнопка для обновления */}
            <button onClick={handleUpdateClick}>Update</button>
        </div>
    );
};

export default UpdateTrainerButton;