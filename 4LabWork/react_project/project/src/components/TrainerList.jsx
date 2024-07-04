import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import "../styles/TrainerList.css"
import NavBar from "./NavBar";
import NameSearch from "./Search/NameSearch";
import MySelect from "./Selector/MySelect";
import {Link} from "react-router-dom";
import UpdateClientButton from "./buttons/update/UpdateClientButton";
import DeleteClientButton from "./buttons/delete/DeleteClientButton";
import UpdateTrainerButton from "./buttons/update/UpdateTrainerButton";
import DeleteTrainerButton from "./buttons/delete/DeleteTrainerButton";
const TrainerList = () => {
    const [trainers, setTrainers] = useState([]);
    const accessToken = localStorage.getItem('accessToken')
    const [reducerValue, forceUpdate] = useReducer(x=>x+1,0)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('')
    const [selectedSort, setSelectedSort] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/trainer');
                // Проверьте, что response.data.response является массивом перед использованием map
                if (Array.isArray(response.data.response)) {
                    setTrainers(response.data.response);
                } else {
                    console.error('Response data.response is not an array:', response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reducerValue]);
    const sortTrainers=(sort)=>{
        setSelectedSort(sort);
        if(sort === "name") {
            setTrainers([...trainers].sort((a, b) => a[sort].localeCompare(b[sort])))
        }
        else if(sort === 'salary'){
            setTrainers([...trainers].sort((a, b) => a.salary - b.salary))
        }
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSearchClick = () => {
        setSearchTerm(searchInput);
    };

    const filteredTrainers = trainers.filter((trainer) =>
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <NavBar/>
            <NameSearch
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <MySelect
                value={selectedSort}
                onChange={sortTrainers}
                defaultValue="Сортировка"
                options={[
                    {value:'name', name:"По имени"},
                    {value:'salary', name:'По зарплате'},
                ]}/>
            {accessToken!== null && (
                <>
                    <div className="container">
                        <Link to="/trainers/create" className="navbar-link">CreateNew</Link>
                    </div>
                </>
            )}
            <h2>ListOfTrainers</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>Avatar</th>
                    {accessToken!== null && (
                        <>
                            <th>EditButton</th>
                            <th>DeleteButton</th>
                        </>
                    )}
                </tr>
                </thead>
                <tbody>
                {/* Теперь можно использовать map, так как clients - это массив */}
                {filteredTrainers.map(trainer => (
                    <tr>
                        <td>{trainer.name}</td>
                        <td>{trainer.designation}</td>
                        <td>{trainer.salary}</td>
                        <td>{trainer.email}</td>
                        <td>{trainer.phone}</td>
                        <td>{trainer.age}</td>
                        <td><img src={"http://localhost:3000/" + trainer.avatar} alt="Trainer Photo" width="200" height="150"></img></td>
                        {accessToken!== null && (
                            <>
                                <td><UpdateTrainerButton trainerId={trainer._id} accessToken={accessToken} reloadFunction={forceUpdate}/></td>
                                <td><DeleteTrainerButton trainerId={trainer._id} accessToken={accessToken} reloadFunction={forceUpdate}/></td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainerList;