import React, { useContext } from 'react';
import CrudContext from '../context/CrudContext';
import { Link } from 'react-router-dom';
//компонент для создания поста
export default function NewPost() {
    const {sendPost, textInput } = useContext(CrudContext);//получаем метод для отправки поста
    return (//и ссылку для управления содержимым поля текста
        <div className="text-container">
            <Link to="/" className="link-close">X</Link>
            <form className="text-form" id="text-form">
                <textarea className="text-post" ref={ textInput }></textarea>
            </form>
            <Link to="/" className="send-btn" onClick={() => sendPost('new')}>Send</Link>
        </div>
    )
}
