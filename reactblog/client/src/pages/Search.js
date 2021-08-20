import { useQuery,  } from '@apollo/client';
import React , {useState, useRef,useEffect } from 'react';
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
        variables: {userName:userInfo},
        
    });

    useEffect(() => {
        if (loading) return
      
        console.log("data2 " + data)
        if (data === undefined) {
          console.log("in here 1")
          userFound.current = false
        } else {
          console.log("in here 2")
          userFound.current = true
        }
      }, [loading])

    
    return (
        <div>
            <p>Search for a user</p>
            <input
                name = "userName"
                value = {userInfo.userName}
                onChange = {userNameChange}
               
            ></input>
             {loading ? (
            <div>Loading...</div>
          ):(
            <div>
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