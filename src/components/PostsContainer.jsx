import React, { useContext } from 'react';
import CrudContext from '../context/CrudContext';
import CreatePost from './CreatePost';
import PostPrev from './PostPrev';
//компонент для отрисовки всего списка постов
export default function PostsContainer() {
    const { posts } = useContext(CrudContext);//получаем посты и отрисовываем
    
    return (
        <React.Fragment>
            <div className='header'>
                <CreatePost />
            </div>
            <div className='posts-container'>
                { !posts || posts.length === 0 ? <h1>Create your first post!</h1> : posts.map((i) => {
                    return <PostPrev content = { i.content } id = { i.id } 
                    created = { i.created } key = { i.id }/>
                })}
            </div>
        </React.Fragment>
           
    )
}
