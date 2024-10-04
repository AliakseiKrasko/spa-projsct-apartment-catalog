export default class Bids {
    constructor() {
        // Пустой конструктор, можно использовать для инициализации данных в будущем
    }

    // Асинхронная функция для получения заявок
    async getBids() {
        try {
            // URL для получения данных заявок
            const queryString = `https://jsproject.webcademy.ru/bids`;

            // Выполняем fetch-запрос
            const result = await fetch(queryString);

            // Преобразуем результат в JSON
            const data = await result.json();

            // Сохраняем полученные заявки в переменную объекта
            this.bids = await data;
        } catch (error) {
            // В случае ошибки выводим сообщение и логируем ошибку
            alert('Error with getting Bids');
            console.log(error);
        }
    }
}
