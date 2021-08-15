import { useQuery, useMutation } from '@apollo/client';
import {QUERY_ME} from '../utils/queries';
import Delete from "../components/Delete";





function UpdateAndDelete(){

    const { loading, error, data } = useQuery(QUERY_ME);

    return (
        <div>
            {loading ? (
            <div>Loading...</div>
          ):(
            <Delete type = {data} />



          )}
        </div>
    )

}

export default UpdateAndDelete