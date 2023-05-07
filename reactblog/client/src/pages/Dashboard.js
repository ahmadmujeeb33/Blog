import { Link } from 'react-router-dom';
import Edit from './NewPost'
import {QUERY_ME} from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

import '../styles/Dashboard.css';


function Dashboard() {

    const { loading, error, data } = useQuery(QUERY_ME);
    
    
    return (
        <div className = "DashboardContainer">
            {loading ? (
            <div>Loading...</div>
          ):(
            <div className = "FullContainer">
                {data.me.posts.map((currentData)=>{
                    return  <div>
                                <Link style={{ textDecoration: 'none' }} to={`/UpdateAndDelete/${currentData._id}`}>
                                    <div className = "BlogContents">
                                        <div className = "TitleContents">
                                            <p>{currentData.title}</p>
                                            <p>{currentData.date_Created}</p>
                                        </div>
                                            <div className = "BodyContents">
                                                <p>{currentData.content}</p>
                                            </div>
                                            
                                    </div>
                                    
                                </Link>
                                <br></br>
                            </div>   
                })}
                <button><Link style={{ textDecoration: 'none' }} to="/NewPost" className="btn btn-primary">Create Post</Link></button>
            </div>
        )}
        </div>
    )

}


export default Dashboard;