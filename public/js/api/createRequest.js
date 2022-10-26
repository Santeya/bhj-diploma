// Основная функция для совершения запросов на сервер.

const createRequest = (options = {}) => {
    
    let { url, data, method, callback } = options;
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    let formData = new FormData();
   
    if (data) {
        if (method === 'GET') {
            url += ('?' + Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&'));
            formData = '';
        } else {
            Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        }
    }

    try {
        xhr.open(method, url);
        xhr.send(formData);
    }
    catch (err) {
        callback(err, response);
    }

    /*
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            callback(xhr.status, xhr.statusText);
        }
    })
    */
    xhr.addEventListener('load', () => callback(null, xhr.response)) 
    xhr.addEventListener('error', () => callback(xhr.status, xhr.statusText))
}
