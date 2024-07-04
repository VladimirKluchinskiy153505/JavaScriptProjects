import React from 'react';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import "../styles/NabBar.css"
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const NavBar = ({ onLogin, onRegister, onLogout }) => {
    // const navigate = useNavigate();
    // const handleRegisterClick =()=>{
    //     navigate('/register');
    // }
    return (
        <div>
        {/*<Routes>*/}
        {/*    <Route exact path="/register" element={<Registration/>}/>*/}
        {/*</Routes>*/}
        <nav>
            <ul className="navbar-list">
                <li><Link to="/login" className="navbar-link">Войти</Link></li>
                <li><Link to="/register" className="navbar-link">Регистрация</Link></li>
                <li><Link to="/logout" className="navbar-link">Выход</Link></li>
                <li><Link to="/" className="navbar-link">HOME</Link></li>
                <li><GoogleLogin
                    onSuccess={(credentialResponse)=>{
                        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                        console.log(credentialResponseDecoded);
                    }}
                    onError={()=>{
                        console.log("LoginFailed")
                    }}
                /></li>
                <li><button className="navbar-button" onClick={googleLogout}>GoogleLogout</button></li>
            </ul>
        </nav>
        </div>
    );
};

export default NavBar;