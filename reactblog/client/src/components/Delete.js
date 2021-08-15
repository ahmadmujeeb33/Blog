
import {useMutation } from '@apollo/client';
import { DELETE_POST } from '../utils/mutations';
import { useParams} from 'react-router-dom';

function Delete(props){

    const [deletePost, { error1, data1 }] = useMutation(DELETE_POST);
    const { id } = useParams();
    console.log(id);

    async function deleteEverything(){
        try {
            const { data } = await deletePost({
              variables: {_id:id},
            });
            window.location.assign('/Dashboard');

          } catch (e) {
            console.log("++++++++++++++++++++++++++++++++++++++++++++======")
            console.error(e);
        }
    }

    return (
        <div>
            <button
                onClick = {deleteEverything}
                type="submit"
            >
            Delete
            </button>
        </div>
    )
}

export default Delete;