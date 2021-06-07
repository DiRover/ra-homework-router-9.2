import React, { useContext } from 'react';
import randomAvatar from '../service/randomAvatar';
import CrudContext from '../context/CrudContext';
import { Link } from 'react-router-dom';
import moment from 'moment';
//компонени для отрисовки поста в режиме его выбора
export default function Post({match}) {// т.к. используем роут с параметрами "/post/:id", то может получить объект mstch
    const { posts, deletePost, editPost } = useContext(CrudContext);//получаем посты, методы удаления и редактирования поста
    const id = Number(match.params.id);//из объекта match получаем айди поста
    const avatar = randomAvatar();//получаем рандомный аватар-заглушку
    const post = posts.find((i) => i.id === id);//находим по айди пост из массива постов
    const time = moment(post.created).format('hh:mm DD.MM.YYYY');//преобразуем таймштамп в нужный формат

    return (
        <div className='post-box'>
            <Link to="/" className="link-close link-close-post">X</Link>
            <div className='post'>
                <div className='avatar'>{ avatar }</div>
                <div className='post-content'>{ post.content }</div>
                <div className='post-date'>{ time }</div>
            </div>
            <div className='post-btns'>
                <Link to="/post/change" className="edit-btn" onClick={() => editPost(id, post.content)}>Edit post</Link>
                <Link to="/" className="delete-btn" onClick={() => deletePost(id)}>Delete post</Link>
            </div>
        </div>
    )
}
