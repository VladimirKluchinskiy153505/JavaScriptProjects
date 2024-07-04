import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import '../styles/Base.css'
import ClientList from "./ClientList";
import {BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Clients_page from '../pages/clients_page'
import Trainers_page from '../pages/trainers_page'
import TrainerList from "./TrainerList";
import ClubCardList from "./ClubCardList";
import LessonList from "./LessonList";
import Registration from "./SingInOut/Registration";
const BaseComponent = () => {
    const [userTimeZone, setUserTimeZone] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tableDataDate, setTableDataDate] = useState(new Date()); // Замените на актуальные данные из вашей таблицы

    useEffect(() => {
        // Получение тайм зоны пользователя
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setUserTimeZone(userTimeZone);

        // Обновление текущей даты каждую секунду
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            {/* Верхняя панель навигации */}
            <NavBar
                onLogin={() => console.log('Войти')}
                onRegister={() => console.log('Регистрация')}
                onLogout={() => console.log('Выход')}
            />

            {/* Отображение тайм зоны пользователя */}
            <div>Тайм зона пользователя: {userTimeZone}</div>

            {/* Отображение текущей даты */}
            <div>Текущая дата: {currentDate.toLocaleString()}</div>

            {/* Отображение даты добавления/изменения данных в таблице для тайм зоны пользователя и для UTC */}
            <div>Дата добавления/изменения данных в таблице (по тайм зоне пользователя): {tableDataDate.toLocaleString()}</div>
            <div>Дата добавления/изменения данных в таблице (по UTC): {tableDataDate.toISOString()}</div>


            <div>
                <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/clients">Clients</Link>
                    </li>
                    <li>
                        <Link to="/trainers">Trainers</Link>
                    </li>
                    <li>
                        <Link to="/clubCards">ClubCards</Link>
                    </li>
                    <li>
                        <Link to="/lessons">Lessons</Link>
                    </li>
                </ul>
                </nav>
            {/*<Routes>*/}
            {/*    <Route exact path="/clients" element={<ClientList />} />*/}
            {/*    <Route exact path="/trainers" element={<TrainerList />} />*/}
            {/*    <Route exact path="/clubCards" element={<ClubCardList />} />*/}
            {/*    <Route exact path="/lessons" element={<LessonList />} />*/}
            {/*</Routes>*/}
            </div>
        </div>

    );
};

export default BaseComponent;