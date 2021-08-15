import { Link } from 'react-router-dom';
import Edit from './NewPost'
import {QUERY_ME} from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';



function Dashboard() {

    const { loading, error, data } = useQuery(QUERY_ME);
    // let newData = data?.me || {}
    // console.log("newData " + data.me);
    // newData = data.me.posts;
    // console.log(data.me.posts)
    // let newData = data[me][post];
    // console.log("newdata " + newData)
    
    return (
        <div>
            {loading ? (
            <div>Loading...</div>
          ):(
              <div>
                {data.me.posts.map((currentData)=>{
                    return  <div>
                                <Link to={`/UpdateAndDelete/${currentData._id}`}>
                                    <p>{currentData.title}</p>
                                    <p>{currentData.content}</p>
                                    <p>{currentData.date_Created}</p>
                                </Link>
                                <br></br>
                            </div>   
                })}


                {/* {data.me.posts.map(({content, date_Created, title}) => (
                    <div>
                        <div>{content}</div>
                        <div>{date_Created}</div>
                        <div>{title}</div>
                        <br></br>
                    </div>
                ))}; */}
            
                {/* <p>{data.me.posts[0]}</p> */}
                <button><Link to="/NewPost" className="btn btn-primary">Create Post</Link></button>
            </div>
        )}
        </div>
    )

}


export default Dashboard;