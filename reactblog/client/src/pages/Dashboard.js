import { Link } from 'react-router-dom';
import Edit from './NewPost'


function Dashboard() {
    return (
        <div>
            <button><Link to="/NewPost" className="btn btn-primary">Create Post</Link></button>
        </div>
    )

}


export default Dashboard;