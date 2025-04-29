import {QUERY_SINGLE_POST} from '../utils/queries';
import React , {useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { UPDATE_POST } from '../utils/mutations';

import '../styles/UpdateAndDelete.css';

import moment from 'moment'
var today = moment();

function Update(props){

    
    const { loading, error, data } = useQuery(QUERY_SINGLE_POST, {
        onCompleted: (data) => {
            setPostInfo({
                title: data.post.title,
                content: data.post.content,
            })
        },

        variables: {_id:props.type },
    });


    const [postInfo, setPostInfo] = useState({})
    

    const [updatePost, { updateerror, updatedata }] = useMutation(UPDATE_POST);

    

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
            const { data } = await updatePost({
              variables: { ...postInfo,_id:props.type, date_Created:todayDate},
            });
            window.location.assign('/Dashboard');

          } catch (e) {
            console.error(e);
        }

    }
    return (
        <div>
            <div>
                <div className = "inputAreas">
                    <p>Title</p>
                    <textarea
                        name = "title"
                        value = {postInfo.title}
                        onChange ={PostChange}
                        id = "deleteInput"
                        cols = "70"
                    ></textarea>
                    <p>Content</p>
                    <textarea
                        name = "content"
                        value = {postInfo.content}
                        onChange = {PostChange}
                        id = "contentInput"
                        rows = "10"
                        cols = "70"
                    ></textarea>
                </div>

                <div className = "Buttons">
                    <button style={{ cursor: 'pointer' }} className = "Update" onClick = {PostButton}>Update</button>
                </div>
            </div>
        </div>
    )
 

}

export default Update
