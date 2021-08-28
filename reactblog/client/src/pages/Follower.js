
import {QUERY_ME} from '../utils/queries';
import { useQuery, useMutation, useLazyQuery  } from '@apollo/client';
import { QUERY_SINGLE_USERS } from '../utils/queries';
import Following from "../components/Following"

import '../styles/Following.css';


function Follower(){

    const { loading, error, data } = useQuery(QUERY_ME);
    let name = "";

    const [user, { loading1, data1 }] = useLazyQuery(QUERY_SINGLE_USERS);


    
    return (
        <div className = "FollowingContainer">
                {loading ? (
                    <div>Loading...</div>
                ):(
                    <div className = "FollowingContainerItems">
                        {data.me.followers.map((follower)=>{
                        return  <div>
                                <Following userName = {follower} />                               
                                </div>   
                        })}

                    </div>

                )}
        </div>
    )

}


export default Follower 