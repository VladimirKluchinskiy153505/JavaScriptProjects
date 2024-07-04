import React from 'react';
import {useNavigate} from "react-router-dom";

const UpdateLessonButton = ({lessonId, accessToken}) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        localStorage.setItem('lessonId',lessonId)
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
export default UpdateLessonButton;