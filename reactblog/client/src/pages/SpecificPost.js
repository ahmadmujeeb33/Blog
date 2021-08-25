

import { QUERY_SINGLE_POST } from '../utils/queries';
import { useQuery} from '@apollo/client';
import {Link, useParams} from 'react-router-dom';

import Comment from "../components/Comment"





function SpecificPost(){

    const {id} = useParams();

    const { loading, error, data } = useQuery(QUERY_SINGLE_POST, {
    

        variables: {_id:id},
    });

 

    function thing(currentData){
      console.log("props.allData " + data.post.title);
      console.log("currentData.userName " + currentData.userName)
      console.log("currentData.content " + currentData.content)
      console.log("currentData.date_Created " + currentData.date_Created)
  }



    return (
        <div>
             {loading ? (
            <div>Loading...</div>
          ):(
            <div>
                <p>{data.post.title}</p>
                <p>{data.post.content}</p>
                <p>{data.post.date_Created}</p>


                {data.post.comments.map((currentData)=>{
                        thing(currentData)
                        return  <div>
                                    <p>{currentData.userName}</p>
                                    <p>{currentData.content}</p>
                                    <p>{currentData.date_Created}</p>                          
                                    <br></br>
                                </div>   
                  })}

                {<Comment postId = {id} allData = {data}/>}

              

            </div>

          )}
        </div>
    )




}

export default SpecificPost;