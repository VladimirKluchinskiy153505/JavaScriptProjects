import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import "../styles/ClientList.css"
import NavBar from "./NavBar";
import DeleteClientButton from "./buttons/delete/DeleteClientButton";
import UpdateClientButton from "./buttons/update/UpdateClientButton";
import {Link} from "react-router-dom";
import MySelect from "./Selector/MySelect";
import NameSearch from "./Search/NameSearch";
const ClientList = () => {
    const [clients, setClients] = useState([]);
    const accessToken = localStorage.getItem('accessToken')
    const [reducerValue, forceUpdate] = useReducer(x=>x+1,0)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('')
    const [selectedSort, setSelectedSort] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/client');
                // Проверьте, что response.data.response является массивом перед использованием map
                if (Array.isArray(response.data.response)) {
                    setClients(response.data.response);
                } else {
                    console.error('Response data.response is not an array:', response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reducerValue]);

    console.log(localStorage.getItem('accessToken'))
    const sortClients=(sort)=>{
        setSelectedSort(sort);
        if(sort === "name") {
            setClients([...clients].sort((a, b) => a[sort].localeCompare(b[sort])))
        }
        else if(sort === 'age'){
            setClients([...clients].sort((a, b) => a.age - b.age))
        }
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSearchClick = () => {
        setSearchTerm(searchInput);
    };

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                onChange={sortClients}
                defaultValue="Сортировка"
                options={[
                    {value:'name', name:"По имени"},
                    {value:'age', name:'По возрасту'},
                ]}/>

            {accessToken!== null && (
                <>
                    <div className="container">
                    <Link to="/clients/create" className="navbar-link">CreateNew</Link>
                    </div>
                </>
                )}
            <h2>ListOfClients</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>Card</th>
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
            {filteredClients.map(client => (
                <tr>
                    <td><p>{client.name}</p></td>
                    <td><p>{client.email}</p></td>
                    <td><p>{client.phone}</p></td>
                    <td><p>{client.age}</p></td>
                    <td><p>{client.card}</p></td>
                    <td><img src={"http://localhost:3000/" + client.avatar} alt="Client Photo" width="200" height="150"></img></td>
                    {accessToken!== null && (
                        <>
                            <td><UpdateClientButton clientId={client._id} accessToken={accessToken} reloadFunction={forceUpdate}/></td>
                            <td><DeleteClientButton clientId={client._id} accessToken={accessToken} reloadFunction={forceUpdate}/></td>
                        </>
                    )}
                </tr>
            ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;