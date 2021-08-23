
import {QUERY_ME} from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

function Follower(){

    const { loading, error, data } = useQuery(QUERY_ME);


    return (
        <div>
            Hello

            {loading ? (
                <div>Loading...</div>
             ):(
                <div>
                    {data.me.followers.map((follower)=>{

                    return  <div>
                                {/* <Link to={`/Followers/${currentData._id}`}> */}
                                    <p>{follower}</p>
                                {/* </Link> */}
                                <br></br>
                            </div>   
                    })}

                </div>

            )}
        </div>
    )

}


export default Follower 