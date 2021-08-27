import React , { useState } from 'react';

import Login from '../components/Login';
import Signup from '../components/Signup';

import Auth from '../utils/auth';

import '../styles/LoginSignUp.css';


function LoginSignUp() {


    return (
        <div>
            <div className = "loginContainer">
                <div className = "loginContainerItems">
                    <Login/>
                    <Signup/>
                </div>
            </div>
        </div>
            
    )

}


export default LoginSignUp;