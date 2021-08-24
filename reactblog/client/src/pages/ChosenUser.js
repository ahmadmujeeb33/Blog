import { useParams} from 'react-router-dom';
import { QUERY_SINGLE_USERS } from '../utils/queries';
import { useQuery} from '@apollo/client'


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
                                <p>{currentData.title}</p>
                                <p>{currentData.content}</p>
                                <p>{currentData.date_Created}</p>
                            
                                <br></br>
                            </div>   
                })}
            </div>

             )}

        </div>
    )


}




export default ChosenUser