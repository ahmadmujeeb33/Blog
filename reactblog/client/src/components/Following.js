
import { QUERY_SINGLE_USERS } from '../utils/queries';
import { useQuery} from '@apollo/client';
import {Link} from 'react-router-dom';
    
function Following(props){

    const { loading, error, data } = useQuery(QUERY_SINGLE_USERS, {
        variables: {userName:props.userName.toString()},
        
    });

  
    return (
        <div>
             {loading ? (
                <div>Loading...</div>
             ):(
                <div className = "allFollowing">
                        <Link style={{ textDecoration: 'none' }} to={`/CurentUser/${data.user.userName}`}>
                            <div className = "allFollowingItems">
                                <p className="followingName">{props.userName}</p>
                            </div>
                        </Link>
                </div>
             )}
        </div>
    )

}

export default Following;