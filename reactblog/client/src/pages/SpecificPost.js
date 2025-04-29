

import { QUERY_SINGLE_POST } from '../utils/queries';
import { useQuery} from '@apollo/client';
import {Link, useParams} from 'react-router-dom';

import Comment from "../components/Comment"

import '../styles/SpecificPost.css';


function SpecificPost(){

    const {id} = useParams();

    const { loading, error, data } = useQuery(QUERY_SINGLE_POST, {
    

        variables: {_id:id},
    });

    return (
        <div className = "SpecificPostContainer">
             {loading ? (
            <div>Loading...</div>
          ):(
            <div className =  "FullContainer">
                <div className = "BlogContents">
                  <div className = "TitleContents">
                    <p>{data.post.title}</p>
                    <p>{data.post.date_Created}</p>
                  </div>  
                  <div className = "BodyContents">        
                    <p>{data.post.content}</p>
                  </div>
                </div>

                {data.post.comments.map((currentData)=>{
                        
                        return   <div>
                                    <div className = "CommentContainer">
                                      <p>{currentData.content}</p>
                                      <p> Posted By {currentData.userName} on {currentData.date_Created}</p>                     
                                      <br></br>
                                    </div>
                                </div>   
                  })}

                {<Comment postId = {id} allData = {data}/>}

              

            </div>

          )}
        </div>
    )




}

export default SpecificPost;