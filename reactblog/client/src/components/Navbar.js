import React from 'react';
import '../App.css'
import {Link} from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import '../styles/header.css';



const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


function TheNavbar() {
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <div>
                    <div className = "menu-bar">
                        <div className = "menu-bar-items">
                            <Link  to="/" style={{ textDecoration: 'none' }}>Home</Link>
                            <Link  to="/Dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            <Link  to="/Search" style={{ textDecoration: 'none' }}>Search</Link>
                            <Link  to="/Following" style={{ textDecoration: 'none' }}>Following</Link>
                            <Link  to="" onClick={logout} style={{ textDecoration: 'none' }} >Logout</Link>   
                        </div>
                    </div>               
                </div>
            ) : (
                <div>
                    <div className = "menu-bar">
                        <div className = "menu-bar-items">
                            <Link  to="/" style={{ textDecoration: 'none' }}>Home</Link>
                            <Link  to="/LoginSignUp" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            <Link  to="/LoginSignUp" style={{ textDecoration: 'none' }}>Search</Link>
                            <Link  to="/LoginSignUp" style={{ textDecoration: 'none' }}>Following</Link>
                            <Link  to="/LoginSignUp" style={{ textDecoration: 'none' }}>Login</Link>

                    </div>
                        </div>
                </div>
            )}      
                
            
        </div>

    );
}

export default TheNavbar;