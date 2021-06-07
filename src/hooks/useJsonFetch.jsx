import { useState, useEffect } from 'react';
//кастомный хук, вот тут всё дело с магией
export default function useJsonFetch(setPosts) {
    const [req, setReq] = useState();//хранение параметров для запроса, через setReq в CrudProvider передаём новое значение для стейта
    const [result, setResult] = useState();//хранение результатов запроса
    useEffect(() => {
        async function fetchData() {
            try {
                const { url, opts, method, value, typeReq, id } = req;//деструктируем параметры запроса из стейта, получаем их в CrudProvider
                let response;//переменная для хранения ответа с сервера
                if (method === 'GET') {//просто получение данных с сервера
                    response = await fetch(`${url}${opts}`)//записываем ответ сервера
                } else if (method === 'POST' && typeReq === 'new') {//отправка нового контента
                    await fetch(`${url}${opts}`, { //объявление функции
                    method: 'POST', //метод
                    headers: { //нужно обязательно прописать!!! иначе сервер неправильно парсит
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id: 0, content: value}) //тело запроса с контентом на сервер
                    });
                    response = await fetch(`${url}${opts}`, { method: 'GET' });//записываем ответ сервера
                } else if (method === 'POST' && typeReq === 'change') {//отправка изменённого контента
                    await fetch(`${url}${opts}`, { //объявление функции
                    method: 'POST', //метод
                    headers: { //нужно обязательно прописать!!! иначе сервер неправильно парсит
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id: id, content: value}) //тело запроса с контентом на сервер
                    });
                    response = await fetch(`${url}${opts}`, { method: 'GET' });//записываем ответ сервера
                    
                } else if (method === 'DELETE') {//удаление контента
                    await fetch(`${url}${opts}/${value}`, { method: 'DELETE' });
                    response = await fetch(`${url}${opts}`, { method: 'GET' });//записываем ответ сервера
                }
                const result = await response.json();//парсим ответ
                setResult(result);//записываем ответ в стейт
            } catch (e) {
                console.log(e);//читаем ошибку в консоле
            } 
        }
        fetchData(); //запускаем функцию для отправки и получение запросов
    }, [req]);//отслеживаем изменение параметров запроса на сервер, при изменении срабатывает useEffect

    return [setReq, result];//возвращаем результат и колбэк для стейта, в который записываем параметры для запросов на сервер
}
