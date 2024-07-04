import React from 'react';

const DeleteLessonButton = ({ lessonId, accessToken, reloadFunction }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/lesson/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({lessonID:lessonId}),
            });

            if (response.ok) {
                // Обработка успешного удаления
                console.log('Client deleted successfully');
            } else {
                // Обработка ошибки удаления
                console.error('Error deleting client');
            }
            reloadFunction();
        } catch (error) {
            console.error('Error during delete request:', error);
        }
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteLessonButton;