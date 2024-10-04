export default class Filter {
	constructor() {
		this.query = '';  // Изначально запрос пуст
	}

	// Получаем параметры для фильтрации (проекты, количество комнат и т.д.)
	async getParams() {
		try {
			const queryString = 'https://jsproject.webcademy.ru/itemsinfo';  // URL для получения параметров
			const response = await fetch(queryString);
			const data = await response.json();
			this.params = data;  // Сохраняем полученные параметры
		} catch (error) {
			alert(error);  // В случае ошибки выводим сообщение
		}
	}

	// Получаем результаты по фильтру
	async getResults() {
		try {
			const queryString = `https://jsproject.webcademy.ru/items${this.query}`;  // URL с параметрами фильтра
			const response = await fetch(queryString);
			const data = await response.json();
			this.result = data;  // Сохраняем полученные результаты
			console.log('Filter -> getResults -> this.result', this.result);
		} catch (error) {
			alert(error);  // В случае ошибки выводим сообщение
		}
	}
}
