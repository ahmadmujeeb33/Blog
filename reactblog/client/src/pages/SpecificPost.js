

import { QUERY_SINGLE_POST } from '../utils/queries';
import { useQuery} from '@apollo/client';
import {Link, useParams} from 'react-router-dom';

import Comment from "../components/Comment"

function SpecificPost(){

    const {id} = useParams();

    const { loading, error, data } = useQuery(QUERY_SINGLE_POST, {
    

        variables: {_id:id},
    });


    return (
        <div>
             {loading ? (
            <div>Loading...</div>
          ):(
            <div>
                <p>{data.post.title}</p>
                <p>{data.post.content}</p>
                <p>{data.post.date_Created}</p>

                {<Comment postId = {id} allData = {data}/>}

            </div>

          )}
        </div>
    )




}

export default SpecificPost;