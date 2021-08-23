import React from 'react';
import '../App.css'
import {Link} from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';




const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


function TheNavbar() {
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <div>
                    <Link  to="/">Home</Link>
                    <Link  to="/Dashboard">Dashboard</Link>
                    <Link  to="/Search">Search</Link>
                    <Link  to="/Follower">Follower</Link>
                    <Link  to="" onClick={logout} >Logout</Link>                  
                </div>
            ) : (
                <div >
                    <Link  to="/">Home</Link>
                    <Link  to="/LoginSignUp">Dashboard</Link>
                    <Link  to="/LoginSignUp">Search</Link>
                    <Link  to="/LoginSignUp">Follower</Link>
                    <Link  to="/LoginSignUp">Login</Link>
                </div>
            )}      
                
            
        </div>

    );
}

export default TheNavbar;