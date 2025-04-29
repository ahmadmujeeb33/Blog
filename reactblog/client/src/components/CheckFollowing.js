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

        
     
        const alldata = await addFollower({
            variables: {_id:data.me._id, follower: props.searchedUser},
        });

        
        FindFollowing()
          
    }

    function FindFollowing(){
        for(let i=0;i<data.me.followers.length;i++){
            if(data.me.followers[i] === props.searchedUser){
                return <div className = "folowButtonContainer">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                        >
                     Following!
                    </button>
                </div>
                
            }
        }

        if(currentStatus === ""){   
            return <div className = "folowButtonContainer">

            <button 
              onClick = {ToFollowing}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
            >
              Click To Follow!
            </button>
                
            </div>
        
        }

        <h1>hello</h1>
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