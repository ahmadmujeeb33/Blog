import { useParams} from 'react-router-dom';
import { QUERY_SINGLE_USERS } from '../utils/queries';
import { useQuery} from '@apollo/client'
import { Link } from 'react-router-dom';

import Comment from "../components/Comment"

import '../styles/Dashboard.css';

function ChosenUser(){


    const { userName } = useParams();

    const { loading, error, data } = useQuery(QUERY_SINGLE_USERS, {
        variables: {userName:userName.toString()},
        
    });

  

    return (
        <div className = "DashboardContainer">
        {loading ? (
            <div>Loading...</div>
            ):(
            <div className = "FullContainer">
                {data.user.posts.map((currentData)=>{
                    return  <div>
                                <Link style={{ textDecoration: 'none' }} to={`/Post/${currentData._id}`}>
                                    <div className = "BlogContents">
                                        <div className = "TitleContents">
                                            <p>{currentData.title}</p>
                                            <p>{currentData.content}</p>
                                        </div>
                                        <div className = "BodyContents">
                                            <p>{currentData.date_Created}</p>
                                        </div>

                                    </div>

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