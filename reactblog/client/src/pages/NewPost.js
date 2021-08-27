import '../styles/NewPost.css';
import { useQuery, useMutation } from '@apollo/client';
import React , {useState } from 'react';
import { Link} from 'react-router-dom';
import { ADD_POST } from '../utils/mutations';
import {QUERY_ME} from '../utils/queries';

import moment from 'moment'
var today = moment();



function NewPost() {

    const [postInfo, setPostInfo] = useState({title: '', content: ''})

    const { loading, error, data } = useQuery(QUERY_ME);
    console.log("data1 " + data);
    let newData = data?.me || {}
    let id = newData._id;
    console.log("id " + id);

    const [addPost, { error1, data1 }] = useMutation(ADD_POST);
   
     
    

    function PostChange(event){
        const name = event.target.name;
        const value = event.target.value
        setPostInfo({
            ...postInfo,
            [name]: value,
        });
    }

    async function PostButton(event){

        const todayDate = today.format("MMM Do, YYYY")
        console.log("todayDate" + todayDate);
     
        try {
            const { data } = await addPost({
              variables: { ...postInfo,_id:id, date_Created:todayDate},
            });
            window.location.assign('/Dashboard');

          } catch (e) {
            console.log("++++++++++++++++++++++++++++++++++++++++++++======")
            console.error(e);
        }
    }

    return (
        <div>
            <div className = "NewPostContainer">
                <div className = "NewPostItems">
                    <h3>Create New Post</h3>
                    <div className = "inputItems">
                        <p>Title</p>
                        <input
                            name = "title"
                            value = {postInfo.Title}
                            onChange = {PostChange}
                        
                        ></input>
                        <p>Content</p>
                        <input
                            name = "content"
                            value = {postInfo.Content}
                            onChange = {PostChange}
                            id = "ContentInput"
                        
                        ></input>
                        
                    </div>
                    <button style={{ cursor: 'pointer' }} onClick = {PostButton}><Link style={{ textDecoration: 'none' }} to="/NewPost" className="btn btn-primary">Create</Link></button>
                </div>

                
            </div>
        </div>
    )

}


export default NewPost;