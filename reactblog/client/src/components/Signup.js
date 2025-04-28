import React, { useState } from 'react';


import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import { useForm } from 'react-hook-form';


import Auth from '../utils/auth';
import '../styles/LoginSignUp.css';

const Signup = () => {
  const [formState, setFormState] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);


  const { register, handleSubmit, formState: { errors }  } = useForm();

  // update state based on form input changes
  const SignUpChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const SignUpSubmit = async (allData) => {


    try {
      const { data } = await addUser({
        variables: { ...allData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
        
    <div className="signup-container">
      <div class="bg-grey-lighter min-h-screen flex flex-col ">
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-start px-2">
              <div class="bg-white px-6  rounded shadow-md text-black w-full">
                  <h1 class="mb-8 text-3xl text-center pt-4">Sign up</h1>   
                  <form onSubmit={handleSubmit(SignUpSubmit)}>            
                      <input 
                          type="text"
                          class="block border border-grey-light w-full p-3 rounded mb-4" 
                          placeholder="Email" 
                          {...register("email", { required: "This field is required" })}
                          />
                      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                      <input 
                          type="password"
                          class="block border border-grey-light w-full p-3 rounded mb-4"
                          name="password"
                          placeholder="Password"
                          {...register("password", { required: "This field is required" })}
                          />
                      { errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                      <input 
                          type="text"
                          class="block border border-grey-light w-full p-3 rounded mb-4"
                          name="userName"
                          placeholder="Username" 
                          {...register("userName", { required: "This field is required" })}
                      />
                      { errors.userName  && <p style={{ color: 'red' }}>{errors.userName.message}</p>}
                      <button
                          type="submit"
                          class="w-full text-center py-3 text-black hover:bg-green-dark focus:outline-none my-1"
                  >   Create Account</button>
                  </form>
                  <p style={{ color: 'red'}}>{error}</p>
              </div>
          </div>
      </div>

    </div>
        
    );
};

export default Signup;