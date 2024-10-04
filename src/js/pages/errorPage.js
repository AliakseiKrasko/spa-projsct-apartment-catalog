export default function () {
	// Создаем простой HTML-шаблон для страницы ошибки
	const markup = `<div class="container"><h1>Error</h1></div>`;

	// Вставляем шаблон в контейнер с id="app"
	document.querySelector('#app').innerHTML = markup;
}
