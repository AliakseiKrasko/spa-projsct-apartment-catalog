import * as view from './listingView';

export default function (state) {
	console.log('Component Listing started!');

	// Отрисовываем контейнер для карточек
	view.render();

	// Проходим по результатам поиска и отрисовываем каждую карточку
	state.results.forEach(function (item) {
		// Для каждой карточки проверяем, находится ли она в избранном и добавляем соответствующий класс
		view.renderCard(item, state.favourites.isFav(item.id));
	});

	// Добавляем обработчики кликов на иконки избранного
	addToFavsListener();

	// Подписываемся на событие "render-listing" для обновления списка объектов при изменении фильтров
	state.emitter.subscribe('event:render-listing', () => {
		// Очищаем контейнер с карточками
		view.clearListingContainer();

		// Повторно отрисовываем карточки объектов
		state.results.forEach(function (item) {
			view.renderCard(item, state.favourites.isFav(item.id));
		});

		// Обновляем прослушку кликов на иконки избранного после перерисовки карточек
		addToFavsListener();
	});

	// Функция для добавления прослушки событий клика на иконки избранного
	function addToFavsListener() {
		Array.from(document.getElementsByClassName('card__like')).forEach((item) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();

				// Получаем ID карточки, по которой кликнули
				const currentId = e.target.closest('.card').dataset.id;

				// Добавляем/Удаляем карточку в/из избранного
				state.favourites.toggleFav(currentId);

				// Обновляем состояние иконки избранного (активная/неактивная)
				view.toggleFavouriteIcon(
					e.target.closest('.card__like'),
					state.favourites.isFav(currentId)
				);
			});
		});
	}
}
