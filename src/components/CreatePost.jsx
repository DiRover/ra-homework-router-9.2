import { Link } from 'react-router-dom';
//просто кнопка для создания поста
export default function CreatePost() {

    return (
        <Link to="/post/new" className="link-create">Create post</Link>
    )
}