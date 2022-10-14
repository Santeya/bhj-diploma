/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { url, data, method, callback } = options;
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const formData = new FormData();
   
    if (method === 'GET') {
        url += '?' + Object.entries(data).map(([key, value]) => `${key}=${value}`.join('&'));
        formData = '';
    } else {
        Object.entries(data).forEach((key, value) => formData.append(key, value));
    }

    try {
        xhr.open(method, url);
        xhr.send(formData);
    }
    catch (err) {
        callback(err, response);
    }

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            callback(xhr.status, xhr.statusText);
        }
    })
}

/*
// здесь перечислены все возможные параметры для функции
createRequest({
    url: 'https://example.com', // адрес
    data: { // произвольные данные, могут отсутствовать
        email: 'ivan@poselok.ru',
        password: 'odinodin'
    },
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    
    callback: (err, response) => {
        console.log('Ошибка, если есть', err);
        console.log('Данные, если нет ошибки', response);
    }
});
*/