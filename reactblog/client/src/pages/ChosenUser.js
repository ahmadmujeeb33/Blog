import { useParams} from 'react-router-dom';
import { QUERY_SINGLE_USERS } from '../utils/queries';
import { useQuery} from '@apollo/client'
import { Link } from 'react-router-dom';

import Comment from "../components/Comment"

function ChosenUser(){


    const { userName } = useParams();

    const { loading, error, data } = useQuery(QUERY_SINGLE_USERS, {
        variables: {userName:userName.toString()},
        
    });
    console.log("in here " + data.user._id);

    function Thing(currentData){
        console.log("in here " + currentData.title )
    }


    return (
        <div>
        {loading ? (
            <div>Loading...</div>
            ):(
            <div>
                {data.user.posts.map((currentData)=>{
                    Thing(currentData)
                    return  <div>
                                <Link to={`/Post/${currentData._id}`}>
                                    <p>{currentData.title}</p>
                                    <p>{currentData.content}</p>
                                    <p>{currentData.date_Created}</p>

                                </Link>
                            
                                <br></br>
                            </div>   
                })}

                {/* <Comment/> */}
            </div>

             )}

        </div>
    )


}




export default ChosenUser