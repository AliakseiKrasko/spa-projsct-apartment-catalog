export default class FavouritesCards {
	constructor(favsList) {
		// Сохраняем список избранных ID
		this.favsList = favsList;
	}

	// Получаем данные избранных объектов с сервера
	async getFavs() {
		const ids = this.favsList.toString();  // Преобразуем массив ID в строку
		const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`;
		const result = await fetch(queryString);  // Выполняем запрос на сервер
		const data = await result.json();        // Преобразуем ответ в JSON
		this.cards = data;                        // Сохраняем данные карточек
		console.log("FavouritesCards -> getFavs -> this.cards", this.cards);
	}
}
