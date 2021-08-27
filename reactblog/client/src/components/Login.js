import React, { useState } from 'react';


import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import '../styles/LoginSignUp.css';

const Login = () => {

    const [loginState, setloginState] = useState({ userName: '', password: '' });
    const [login, { loginError, logindata }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const LoginChange = (event) => {
    console.log("---------------")
    const { name, value } = event.target;

    setloginState({
      ...loginState,
      [name]: value,
    });
  };

  // submit form
  const LoginSubmit = async (event) => {
    event.preventDefault();
    console.log("---------------------------")

    try {
        const  {data}  = await login({
            variables: { ...loginState },
          });  
        Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (     
            <div>
                <div className = "inputContainer">
                  <h4>Login</h4>
                  <input
                      name="userName"
                      type="text"
                      value={loginState.userName}
                      onChange={LoginChange}
                      placeholder = "Username">
                  </input>
                  <input
                      name="password"
                      type="password"
                      value={loginState.password}
                      onChange={LoginChange}
                      placeholder = "Password">
                  </input>
                  <button
                      className="btn btn-block btn-info"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                      onClick = {LoginSubmit}
                  >
                      Sign In
                  </button>

                </div>

                
            
            </div>
        
    );
};

export default Login;