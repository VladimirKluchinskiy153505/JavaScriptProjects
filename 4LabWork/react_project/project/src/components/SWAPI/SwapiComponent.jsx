import React, {useState} from 'react';

const SwapiComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [characterData, setCharacterData] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        if (inputValue >= 1 && inputValue <= 83) {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${inputValue}`);
                const data = await response.json();
                setCharacterData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            console.error('Invalid input value. Please enter a number between 1 and 83.');
        }
    };

    return (
        <div className="container">
            <h2>SWAPI Character Info</h2>
            <label>
                Enter a number (1-83):
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    min="1"
                    max="83"
                />
            </label>
            <button onClick={handleButtonClick}>Get Character Info</button>

            {characterData && (
                <table>
                    <caption>StarWars Heroes</caption>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>HairColor</th>
                        <th>SkinColor</th>
                        <th>EyeColor</th>
                        <th>BirthYear</th>
                        <th>Gender</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{characterData.name}</td>
                        <td>{characterData.height}</td>
                        <td>{characterData.mass}</td>
                        <td>{characterData.hair_color}</td>
                        <td>{characterData.skin_color}</td>
                        <td>{characterData.eye_color}</td>
                        <td>{characterData.birth_year}</td>
                        <td>{characterData.gender}</td>

                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default SwapiComponent;