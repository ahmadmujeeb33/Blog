import { useQuery, useMutation } from '@apollo/client';
import {QUERY_ME} from '../utils/queries';
import Delete from "../components/Delete";

import Update from "../components/Update";
import { useParams} from 'react-router-dom';

import '../styles/UpdateAndDelete.css';


function UpdateAndDelete(){

    const { loading, error, data } = useQuery(QUERY_ME);
    const { id } = useParams();
    


    return (
        <div className = "Container">
          <div className = "innerContainer">
            {loading ? (
            <div>Loading...</div>
          ):(
            <div>
                <Update type = {id}/>
                <Delete type = {id} />
              
            </div>
          

          )}
          </div>
        </div>
    )

}

export default UpdateAndDelete