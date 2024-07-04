import React from 'react';

const DeleteTrainerButton = ({ trainerId, accessToken, reloadFunction }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/trainer/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({trainerID:trainerId}),
            });

            if (response.ok) {
                // Обработка успешного удаления
                console.log('Trainer deleted successfully');
            } else {
                // Обработка ошибки удаления
                console.error('Error deleting trainer');
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

export default DeleteTrainerButton;