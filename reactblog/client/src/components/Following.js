
import { QUERY_SINGLE_USERS } from '../utils/queries';
import { useQuery} from '@apollo/client';
import {Link} from 'react-router-dom';
    
function Following(props){

    const { loading, error, data } = useQuery(QUERY_SINGLE_USERS, {
        variables: {userName:props.userName.toString()},
        
    });

    // console.log("data " + data._id);
  
    return (
        <div>
             {loading ? (
                <div>Loading...</div>
             ):(
                <div className = "allFollowing">
                        <h2>{data._id}</h2>
                        <Link style={{ textDecoration: 'none' }} to={`/CurentUser/${data.user.userName}`}>
                            <div className = "allFollowingItems">
                                <p>{props.userName}</p>
                            </div>
                        </Link>
                </div>
             )}
        </div>
    )

}

export default Following;