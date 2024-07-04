import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import "../styles/LessonList.css"
import NavBar from "./NavBar";
import NameSearch from "./Search/NameSearch";
import MySelect from "./Selector/MySelect";
import UpdateClientButton from "./buttons/update/UpdateClientButton";
import DeleteClientButton from "./buttons/delete/DeleteClientButton";
import {Link} from "react-router-dom";
import DeleteLessonButton from "./buttons/delete/DeleteLessonButton";
import UpdateLessonButton from "./buttons/update/UpdateLessonButton";
const LessonList = () => {
    const [lessons, setLessons] = useState([]);
    const accessToken = localStorage.getItem('accessToken')
    const [reducerValue, forceUpdate] = useReducer(x=>x+1,0)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('')
    const [selectedSort, setSelectedSort] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/lesson');
                // Проверьте, что response.data.response является массивом перед использованием map
                if (Array.isArray(response.data.response)) {
                    setLessons(response.data.response);
                } else {
                    console.error('Response data.response is not an array:', response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reducerValue]);
    const sortLessons=(sort)=>{
        setSelectedSort(sort);
        if(sort === "subject_name") {
            setLessons([...lessons].sort((a, b) => a[sort].localeCompare(b[sort])))
        }
        else if(sort === 'price'){
            setLessons([...lessons].sort((a, b) => a.price - b.price))
        }
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSearchClick = () => {
        setSearchTerm(searchInput);
    };

    const filteredLessons = lessons.filter((lesson) =>
        lesson.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                onChange={sortLessons}
                defaultValue="Сортировка"
                options={[
                    {value:'subject_name', name:"По название"},
                    {value:'price', name:'По цене'},
                ]}/>
            {accessToken!== null && (
                <>
                    <div className="container">
                        <Link to="/lessons/create" className="navbar-link">CreateNew</Link>
                    </div>
                </>
            )}
            <h2>ListOfLessons</h2>
            <table>
                <thead>
                <tr>
                    <th>SubjectName</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Gym</th>
                    <th>Avatar</th>
                </tr>
                </thead>
                <tbody>
                {/* Теперь можно использовать map, так как clients - это массив */}
                {filteredLessons.map(lesson => (
                    <tr>
                        <td>{lesson.subject_name}</td>
                        <td>{lesson.price}</td>
                        <td>{lesson.date}</td>
                        <td>{lesson.gym}</td>
                        <td><img src={"http://localhost:3000/" + lesson.avatar} alt="Lesson Photo" width="200" height="150"></img></td>
                        {accessToken!== null && (
                            <>
                                <td><UpdateLessonButton lessonId={lesson._id} accessToken={accessToken} reloadFunction={forceUpdate}/></td>
                                <td><DeleteLessonButton lessonId={lesson._id} accessToken={accessToken} reloadFunction={forceUpdate}/></td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LessonList;