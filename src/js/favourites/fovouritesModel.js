export default class Favourites {
	constructor() {
		// Инициализируем пустой массив для избранных элементов
		this.favs = [];

		// Читаем сохраненные данные из localStorage при создании экземпляра
		this.readStorage();
	}

	// Добавляем элемент в избранное
	addFav(id) {
		this.favs.push(id);  // Добавляем ID элемента в массив избранного
		this.saveData();     // Сохраняем обновленный массив в localStorage
	}

	// Удаляем элемент из избранного
	removeFav(id) {
		const index = this.favs.indexOf(id);  // Находим индекс элемента в массиве
		this.favs.splice(index, 1);           // Удаляем элемент
		this.saveData();                      // Сохраняем обновленные данные
	}

	// Проверяем, является ли элемент избранным
	isFav(id) {
		// Возвращаем true, если элемент в избранном, иначе false
		return this.favs.indexOf(id) !== -1 ? true : false;
	}

	// Переключение статуса избранного элемента
	toggleFav(id) {
		// Если элемент в избранном, удаляем его, иначе добавляем
		this.isFav(id) ? this.removeFav(id) : this.addFav(id);
	}

	// Сохраняем данные избранного в localStorage
	saveData() {
		localStorage.setItem('favs', JSON.stringify(this.favs));
	}

	// Читаем данные из localStorage при загрузке страницы
	readStorage() {
		const storage = JSON.parse(localStorage.getItem('favs'));  // Читаем сохраненные данные
		if (storage) this.favs = storage;  // Если данные существуют, обновляем массив избранного
	}
}
