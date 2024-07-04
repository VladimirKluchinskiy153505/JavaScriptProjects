import logo from './logo.svg';
import './App.css';
import ClientList from "./components/ClientList";
import Base from "./components/Base";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import TrainerList from "./components/TrainerList";
import ClubCardList from "./components/ClubCardList";
import LessonList from "./components/LessonList";
import React, {useState} from "react";
import Login from "./components/SingInOut/Login";
import Registration from "./components/SingInOut/Registration";
import Logout from "./components/SingInOut/Logout";
import UpdateClientForm from "./components/CRUD/UpdateClientForm";
import CreateClientForm from "./components/CRUD/CreateClientForm";
import CreateTrainerForm from "./components/CRUD/CreateTrainerForm";
import UpdateTrainerForm from "./components/CRUD/UpdateTrainerForm";
import CreateLessonForm from "./components/CRUD/CreateLessonForm";
import UpdateLessonForm from "./components/CRUD/UpdateLessonForm";
import ImageGenerator from "./components/ImageGenerator";
import SwapiComponent from "./components/SWAPI/SwapiComponent";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Base/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route exact path="/clients" element={<ClientList/>} />
                <Route exact path="/trainers" element={<TrainerList />} />
                <Route exact path="/clubCards" element={<ClubCardList />} />
                <Route exact path="/lessons" element={<LessonList />} />
                <Route exact path="clients/update" element={<UpdateClientForm/>}/>
                <Route exact path="clients/create" element={<CreateClientForm/>}/>
                <Route exact path="trainers/update" element={<UpdateTrainerForm/>}/>
                <Route exact path="trainers/create" element={<CreateTrainerForm/>}/>
                <Route exact path="lessons/create" element={<CreateLessonForm/>}/>
                <Route exact path="lessons/update" element={<UpdateLessonForm/>}/>
            </Routes>
        </BrowserRouter>
        <ImageGenerator/>
        <SwapiComponent/>
    </div>
  );
}

export default App;
