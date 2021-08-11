import React , {useState } from 'react';
import { Link} from 'react-router-dom';


function NewPost() {

    const [postInfo, setPostInfo] = useState({Title: '', Content: ''})

    function PostChange(event){
        const name = event.target.name;
        const value = event.target.value
        setPostInfo({
            ...postInfo,
            [name]: value,
        });
    }

    // function PostButton(event){

    // }

    return (
        <div>
            <p>Post</p>
            <input
                name = "Title"
                value = {postInfo.Title}
                onChange = {PostChange}
            
            ></input>
            <p>Comment</p>
            <input
                name = "Content"
                value = {postInfo.Content}
                onChange = {PostChange}
            
            ></input>
            
            <button><Link to="/NewPost" className="btn btn-primary">Create</Link></button>

            <p>Image</p>
        </div>
    )

}


export default NewPost;