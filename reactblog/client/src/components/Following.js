
import { QUERY_SINGLE_USERS } from '../utils/queries';
import { useQuery} from '@apollo/client';
import {Link} from 'react-router-dom';
    
function Following(props){

    const { loading, error, data } = useQuery(QUERY_SINGLE_USERS, {
        variables: {userName:props.userName},
        
    });
  
    return (
        <div>
             {loading ? (
                <div>Loading...</div>
             ):(
                <div>
                    <Link to={`/Following/${data._id}`}>
                        <p>{props.userName}</p>
                    </Link>
                </div>
             )}

            <h1>help</h1>
        </div>
    )





}

export default Following;