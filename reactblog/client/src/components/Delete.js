
import {useMutation } from '@apollo/client';
import { DELETE_POST } from '../utils/mutations';


function Delete(props){

    const [deletePost, { error1, data1 }] = useMutation(DELETE_POST);
    
    async function deleteEverything(){
        try {
            const { data } = await deletePost({
              variables: {_id:props.type},
            });
            window.location.assign('/Dashboard');

          } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className = "Buttons">
                <button
                    onClick = {deleteEverything}
                    type="submit"
                    className = "Delete"
                    style={{ cursor: 'pointer' }}
                >
                Delete
                </button>
            </div>
        </div>
    )
}

export default Delete;