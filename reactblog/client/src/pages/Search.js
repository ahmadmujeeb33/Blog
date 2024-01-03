import { useQuery,  } from '@apollo/client';
import React , {useState, useRef,useEffect } from 'react';
import { QUERY_SINGLE_USERS } from '../utils/queries';

import CheckFollowing from "../components/CheckFollowing";

import '../styles/Search.css';

function Search(){    
    const [userInfo, setUserInfo] = useState({userName: ''}) 

    const userFound = useRef(false);

   


    function userNameChange(event){
        const name = event.target.name;
        const value = event.target.value
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    }

        
    const { loading, error, data } = useQuery(QUERY_SINGLE_USERS, {
        variables: {userName:userInfo.userName},
        
    });
    

    
        if (loading) {
            ;
           
        }
        else{
            if (data.user === undefined || data.user === null) {
                console.log("in here 1")
                userFound.current = false
              } else {
                userFound.current = true;
              }
        }
        
    //   }, [loading])

    
    return (
        <div>
            <div className = "SearchContainer">
                <div className = "SearchItems">
                    <h2>Search for a user</h2>
                    <div style= {{"textAlign": "center"}}>
                        <textarea
                            name = "userName"
                            value = {userInfo.userName}
                            onChange = {userNameChange}
                        
                        ></textarea>
                    </div>
                    {loading ? (
                    <div>Loading...</div>
                    ):(
                        <>
                            {userFound.current
                                ? <div>
                                    <div className = "folowButtonContainer">
                                        <h3>{data.user.userName}</h3>
                                    </div>
                                    <CheckFollowing searchedUser = {data.user.userName}  />
                                </div>
                                
                                :  <div className = "folowButtonContainer"><h3>No user found with current input</h3></div>
                            }
                            
                        </>

                    )}
                </div>
            </div>

        </div>
        
    )

    




}


export default Search