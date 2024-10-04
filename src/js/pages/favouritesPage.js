import favouritesCards from './../favouritesCards/favouritesCardsController';

export default function (state) {
	// Очищаем контейнер приложения
	document.querySelector('#app').innerHTML = '';

	// Вызываем контроллер избранных карточек и передаем объект состояния
	favouritesCards(state);
}
