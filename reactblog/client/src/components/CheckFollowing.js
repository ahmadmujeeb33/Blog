import React , {useState, useRef,useEffect } from 'react';
import {QUERY_ME} from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

function CheckFollowing(props){

    const { loading, error, data } = useQuery(QUERY_ME);
    let currentStatus = "";


    function FindFollowing(){
        console.log("thissssss " + data.me.followers.length)
        console.log("props.searchedUser " + props.searchedUser)
        let listOfFollowers = []
        for(let i=0;i<data.me.followers.length;i++){
            if(data.me.followers[i] === props.searchedUser){
                return <h1>Following</h1>
                
            }
        }

        if(currentStatus === ""){
            return <h1>Follow</h1>
        }

        <h1>hello</h1>
        console.log(listOfFollowers)
    }

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ):(
                <div>
                    {FindFollowing()}
                </div>
            )}
        </div>
    )



}

export default CheckFollowing