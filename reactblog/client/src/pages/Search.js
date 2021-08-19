import { useQuery } from '@apollo/client';
import React , {useState, useRef } from 'react';
import { QUERY_SINGLE_USERS } from '../utils/queries';

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

        // Update the document title using the browser API
    const { loading, error, data } = useQuery(QUERY_SINGLE_USERS, {
        onCompleted: (data) => {
            setUserInfo({
                userName: userInfo.userName,
            })
        },

        variables: {userName:userInfo},
    });

    console.log("data " + data);
    
    if(data === undefined){
        userFound.current = false
    }
    else{
        userFound.current = true
    }

    

    return (
        <div>
             {loading ? (
            <div>Loading...</div>
          ):(
            <div>
                <p>Search for a user</p>
                <input
                    name = "userName"
                    value = {userInfo.userName}
                    onChange = {userNameChange}
                
                ></input>

                    {userFound.current
                        ? <h3>{data.user.userName}</h3>
                        : <h3>No user found with current input</h3>
                    }
                
            </div>

          )}

        </div>
        
    )

    




}


export default Search