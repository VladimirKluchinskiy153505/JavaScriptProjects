import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ClubCardList.css"
import NavBar from "./NavBar";
const ClubCardList = () => {
    const [clubCards, setclubCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/clubCard');
                // Проверьте, что response.data.response является массивом перед использованием map
                if (Array.isArray(response.data.response)) {
                    setclubCards(response.data.response);
                } else {
                    console.error('Response data.response is not an array:', response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavBar/>
            <h2>ListOfClubCards</h2>
            <table>
                <thead>
                <tr>
                    <th>CardName</th>
                    <th>Discount</th>
                    <th>Avatar</th>
                </tr>
                </thead>
                <tbody>
                {/* Теперь можно использовать map, так как clients - это массив */}
                {clubCards.map(clubCard => (
                    <tr>
                        <td><p>{clubCard.card_name}</p></td>
                        <td><p>{clubCard.discount}%</p></td>
                        <td><img src={"http://localhost:3000/" + clubCard.avatar} alt="ClubCard Photo" width="200" height="150"></img></td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClubCardList;