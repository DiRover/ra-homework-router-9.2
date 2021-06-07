import React, { useState, useEffect } from 'react'
import CrudContext from './CrudContext';
import useJsonFetch from '../hooks/useJsonFetch';
//провайдер для передачи всего и всего между компонентами
export default function CrudProvider(props) {//пропсы нужня для отрисовки props.children
    
    const url = 'http://localhost:7070/';//url, можно было записать в .env
    let textInput = React.createRef(); //ссылка для управления содержимым текстэриа
    const [posts, setPosts] = useState();//хранение постов
    const [currentPost, setCurrentPost] = useState();//хранение текущего поста
    const [setReq, result ] = useJsonFetch();//получаем из кастомного хука метод (колбэк для стейта) для отправки запроса и результат выполнения этого запроса
    
    useEffect(() => {
        if (!result) {//отправляем самый первый запрос (result не существует)
            setReq({url: url, opts: 'posts', method: 'GET'});//передаём в колбэк для стейта параметры для первого запроса
        } else {//если из кастомного хука получили результат, то записываем его
            setPosts(result);//записываем результат и следовательно перерисовываем общий список постов
        }
    }, [result, setReq]);//тут одна из выжных частей магии, отслеживаем изменение результата (за setReq следить не нужно на самом деле) при изменении срабатывает useEffect


    const sendPost = async (typeReq) => {//метод отправки поста на сервер
        const value = textInput.current.value;//получаем через спецовую ссылку текст поста
        if (typeReq === 'new') {//для типа запроса с новым постом
            setReq({url: url, opts: 'posts', method: 'POST', value: value, typeReq: 'new'});//передаём в колбэк для стейта параметры нового поста
        } else {//для типа запроса с постом после редактирования
            setReq({url: url, opts: 'posts', method: 'POST', value: value, typeReq: 'change', id: currentPost.id});//передаём в колбэк для стейта параметры отредактированного поста
        }
        
        textInput.current.value = '';//очищаем текстовое поле, ну так нужно
        setCurrentPost('');//чистим текущий пост, тоже нужно и так понятно
    }

    const deletePost = async (id) => {//метод удаления поста, тут всё просто
        setReq({url: url, opts: 'posts', method: 'DELETE', value: id});//пережаём параметры удаления поста
    }

    const editPost = (id, content) => {//метод изменения поста, не так всё просто
        setCurrentPost({id: id, content: content});//записываем текущий пост
    }
    //отрисовываем всё подряд в контексте и передаём всякие параметры для компонентов
    return (
        <CrudContext.Provider value={{posts, sendPost, textInput, url, setPosts, deletePost, editPost, currentPost }}>
            {props.children}
        </CrudContext.Provider>
    )
}
