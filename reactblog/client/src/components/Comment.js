
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
        event.preventDefault();

        const todayDate = today.format("MMM Do, YYYY")

    
        try {
             await addComment({
                variables: {content: commentInfo.content, _id:props.postId, date_Created:todayDate, userName:data.me.userName},
              });  

              window.location.assign(`/Post/${props.postId}`);
         
        } catch (e) {
          console.error(e);
        }
    };

    


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

                    <div className="buttonContainer">
                        <button 
                        className="bg-sky-500 hover:bg-sky-700 text-white font-semibold text-base py-3 px-6 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                        onClick={CommentButton}
                        >
                        Add Comments
                        </button>

                    </div>

                </div>
             )}
            
        </div>
    )

}


export default Comment
