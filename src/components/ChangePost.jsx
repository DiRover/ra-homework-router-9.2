import React, { useContext } from 'react';
import CrudContext from '../context/CrudContext';
import { Link } from 'react-router-dom';
//компонент, для внесения измений в пост
export default function ChangePost() {
    const { sendPost, currentPost, textInput } = useContext(CrudContext);//получаем метод отправки поста на сервер
    return (//текущий объект поста (айди + контент) и ссылку для управления полем текста
        <div className="text-container">
            <Link to="/" className="link-close">X</Link>
            <form className="text-form" id="text-form">
                <textarea className="text-post" defaultValue={ currentPost.content } ref={ textInput }></textarea>
            </form>
            <Link to="/" className="send-btn" onClick={() => sendPost('change')}>Send</Link>
        </div> 
    )
}