export default class EventEmitter {
	constructor() {
		// Инициализируем объект для хранения событий
		this.events = {};
	}

	// Метод для вызова (эмиссии) события
	emit(eventName, data) {
		const event = this.events[eventName];  // Получаем событие по его имени
		if (event) {
			// Если событие зарегистрировано, вызываем каждую подписанную функцию
			event.forEach((fn) => {
				fn.call(null, data);  // Вызываем функцию с передачей данных
			});
		}
	}

	// Метод для подписки на событие
	subscribe(eventName, fn) {
		// Если события с таким именем еще нет, создаем массив для функций
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		// Добавляем функцию в массив подписчиков события
		this.events[eventName].push(fn);

		// Возвращаем функцию отписки от события
		return () => {
			this.events[eventName] = this.events[eventName].filter(
				(eventFn) => fn !== eventFn  // Убираем указанную функцию из массива подписчиков
			);
		};
	}
}
