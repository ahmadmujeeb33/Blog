
import { useQuery, useMutation } from '@apollo/client';
import React , {useState } from 'react';
import { ADD_COMMENT } from '../utils/mutations';
import {QUERY_ME} from '../utils/queries';
import moment from 'moment'
var today = moment();

function Comment(props){

    const [commentInfo, setCommentInfo] = useState({content: ''}) 

    const [addComment, { error1, data1 }] = useMutation(ADD_COMMENT);

    // const [newCommentsCreated , setCommentsCreated] = useState(false);

    const { loading, error, data } = useQuery(QUERY_ME);


    const CommentChange = (event) => {
        const { name, value } = event.target;
    
        setCommentInfo({
          ...commentInfo,
          [name]: value,
        });
    };


    const CommentButton = async (event) => {
        event.preventDefault();
        console.log("---------------------------")

        const todayDate = today.format("MMM Do, YYYY")
        console.log("todayDate" + todayDate);

        console.log("in thisss2222222 " + props.allData.post.comments)
    
        try {
             await addComment({
                variables: {content: commentInfo.content, _id:props.postId, date_Created:todayDate, userName:data.me.userName},
              });  

              window.location.assign(`/Post/${props.postId}`);
         
        } catch (e) {
          console.error(e);
        }
    };

    // function thing(currentData){
    //     console.log("props.allData " + props.allData.post.title);
    //     console.log("currentData.userName " + currentData.userName)
    //     console.log("currentData.content " + currentData.content)
    //     console.log("currentData.date_Created " + currentData.date_Created)
    // }


    return (
        <div>
            {loading ? (
                <div>Loading...</div>
             ):(
                <div className = "CommentInfo">
                    <textarea
                    name = "content"
                    value = {commentInfo.content}
                    onChange = {CommentChange} 
                    className = "CommentInput"
                    ></textarea>
                
                    <button onClick = {CommentButton} type="submit"
                        id = "CommentButton"
                    
                    >Add</button>
                    

                </div>
             )}
            
        </div>
    )

}


export default Comment