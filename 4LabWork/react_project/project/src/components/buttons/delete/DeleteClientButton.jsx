import React from 'react';

const DeleteClientButton = ({ clientId, accessToken, reloadFunction }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/client/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({clientID:clientId}),
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

export default DeleteClientButton;