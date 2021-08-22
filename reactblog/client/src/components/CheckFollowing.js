import React , {useState, useRef,useEffect } from 'react';
import {QUERY_ME} from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_FOLLOWER } from '../utils/mutations';

function CheckFollowing(props){

    const { loading, error, data } = useQuery(QUERY_ME);

    const [addFollower, { error1, data1 }] = useMutation(ADD_FOLLOWER, {
        refetchQueries: [
            QUERY_ME, // DocumentNode object parsed with gql
            'me' // Query name
        ],
    });

    const [followRequest, setFollowRequest] = useState(false)
    
    let currentStatus = "";



    async function ToFollowing(event){
        event.preventDefault()

        console.log("in thissss");
        
     
        const alldata = await addFollower({
            variables: {_id:data.me._id, follower: props.searchedUser},
        });

        console.log("alldata.data " + alldata.data);

        
        FindFollowing()
          
         
        

    }


    function FindFollowing(){
        console.log("thiaosdifbbjkxzlvxnckvj ");
        let listOfFollowers = []
        console.log("data.me.followers.length  "  + data.me.followers.length);
        for(let i=0;i<data.me.followers.length;i++){
            console.log("in heree");
            if(data.me.followers[i] === props.searchedUser){
                return <button>Following</button>
                
            }
        }

        if(currentStatus === ""){   
            return <button onClick = {ToFollowing}>Follow</button>
        
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