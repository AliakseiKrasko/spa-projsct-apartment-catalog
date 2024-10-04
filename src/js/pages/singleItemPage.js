import singleItem from './../singleItem/singleItemContoller';

export default function (state) {
	// Очищаем контейнер с id="app"
	document.querySelector('#app').innerHTML = "";

	// Вызываем контроллер для отображения одного элемента (например, детальной информации)
	singleItem(state);
}
