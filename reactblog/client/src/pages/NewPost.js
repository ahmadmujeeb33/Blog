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
    let newData = data?.me || {}
    let id = newData._id;

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
     
        try {
            const { data } = await addPost({
              variables: { ...postInfo,_id:id, date_Created:todayDate},
            });
            window.location.assign('/Dashboard');

          } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className = "NewPostContainer">
                <div className = "NewPostItems">
                    <h1>Create New Post</h1>
                    <div className = "inputItems">
                        <p style={{fontWeight:'bold'}}>Title</p>
                        <textarea
                            name = "title"
                            value = {postInfo.Title}
                            onChange = {PostChange}
                            cols = "20"
                        
                        ></textarea>
                        <p style={{fontWeight:'bold'}}>Content</p>
                        <textarea
                            name = "content"
                            value = {postInfo.Content}
                            onChange = {PostChange}
                            rows = "10"
                            cols = "40"
                        
                        ></textarea>
                        
                    </div>

                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                        onClick = {PostButton}
                        >
                        <Link style={{ textDecoration: 'none' }} to="/NewPost" >Create</Link>
                    </button>
                </div>
            </div>
        </>
    )

}


export default NewPost;