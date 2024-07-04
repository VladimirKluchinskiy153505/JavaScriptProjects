import React from 'react';
import { useNavigate } from 'react-router-dom'
const UpdateClientButton = ({clientId, accessToken}) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        // Переход на страницу UpdateForm с передачей параметров
        //console.log('reloadFunction:', reloadFunction);
        localStorage.setItem('clientId',clientId)
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

export default UpdateClientButton;