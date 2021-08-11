import React , { useState } from 'react';

import Login from '../components/Login';
import Signup from '../components/Signup';

import Auth from '../utils/auth';

function LoginSignUp() {


    return (
        <div>
            <Signup/>
            <Login/>
        </div>
            
    )

}


export default LoginSignUp;