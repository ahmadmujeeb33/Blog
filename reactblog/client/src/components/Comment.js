
import { useQuery, useMutation } from '@apollo/client';
import React , {useState } from 'react';
import { ADD_COMMENT } from '../utils/mutations';
import {QUERY_ME} from '../utils/queries';
import moment from 'moment'
var today = moment();

function Comment(props){

    const [commentInfo, setCommentInfo] = useState({content: ''}) 

    const [addComment, { error1, data1 }] = useMutation(ADD_COMMENT);

    const { loading, error, data } = useQuery(QUERY_ME);


    const CommentChange = (event) => {
        const { name, value } = event.target;
    
        setCommentInfo({
          ...commentInfo,
          [name]: value,
        });
    };


    const CommentButton = async (event) => {
        // event.preventDefault();
        console.log("---------------------------")

        const todayDate = today.format("MMM Do, YYYY")
        console.log("todayDate" + todayDate);
    
        try {
             await addComment({
                variables: {content: commentInfo.content, _id:props.postId, date_Created:todayDate, userName:data.me.userName},
              });  
         
        } catch (e) {
          console.error(e);
        }
    };


    return (
        <div>
            {loading ? (
                <div>Loading...</div>
             ):(
                <div>


                    {props.allData.post.comments.map((currentData)=>{
                        return  <div>
                                    <p>{currentData.userName}</p>
                                    <p>{currentData.content}</p>
                                    <p>{currentData.date_Created}</p>

                                
                                    <br></br>
                                </div>   
                    })}




                    <input
                    name = "content"
                    value = {commentInfo.content}
                    onChange = {CommentChange} ></input>
                
                    <button onClick = {CommentButton} type="submit"
                    
                    
                    >Add</button>
                    

                </div>
             )}
            
        </div>
    )

}


export default Comment