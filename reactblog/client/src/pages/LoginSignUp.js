import React , { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import { Link, Redirect } from 'react-router-dom';
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