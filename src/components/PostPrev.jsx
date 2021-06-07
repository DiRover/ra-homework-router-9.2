import React from 'react';
import randomAvatar from '../service/randomAvatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
//компонент для отрисовки поста в общем списке и в дальнейшем его выборе
export default function PostPrev(props) {
    const {id, content, created} = props;//получем айди, текст и время создания
    const avatar = randomAvatar();//получаем рандомный аватар-заглушку
    const time = moment(created).format('hh:mm DD.MM.YYYY');//преобразуем таймштамп в нужный формат
    //выбор поста происходит по клику на его текст!
    return (
        <div className='post-box'>
            <div className='post'>
                <div className='avatar'>{ avatar }</div>
                <Link className='post-content-link' to={`/post/${id}`}><div className='post-content'>{ content }</div></Link>
                <div className='post-date'>{ time }</div>
            </div>
        </div>
    )
}