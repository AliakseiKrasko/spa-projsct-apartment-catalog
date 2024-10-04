export default class SingleItem {
    constructor(id) {
        this.id = id;  // Сохраняем ID объекта
    }

    // Получаем данные о выбранном объекте с сервера
    async getItem() {
        try {
            const queryString = `https://jsproject.webcademy.ru/items/${this.id}`;
            const response = await fetch(queryString);
            const data = await response.json();
            this.result = data;  // Сохраняем данные объекта в переменной result
        } catch (error) {
            alert(error);  // Выводим сообщение об ошибке
        }
    }

    // Отправляем данные формы бронирования на сервер
    async submitForm(formData) {
        const queryString = `https://jsproject.webcademy.ru/bidnew`;

        const response = await fetch(queryString, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(formData),  // Преобразуем данные формы в JSON
        });

        const data = await response.json();
        this.response = data;  // Сохраняем ответ сервера в переменной response
    }
}
