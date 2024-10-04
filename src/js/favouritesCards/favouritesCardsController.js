import FavouritesCards from './favouritesCardsModel';
import * as view from './favouritesCardsView';

export default async function (state) {
	// Получаем список избранных объектов из состояния
	const favsList = state.favourites.favs;

	// Создаем модель избранных объектов и загружаем данные с сервера
	const favouriteCards = new FavouritesCards(favsList);
	await favouriteCards.getFavs();

	// Отображаем страницу с карточками
	view.renderPage(favouriteCards.cards);

	// Запускаем прослушку кликов на иконках "Добавить в избранное"
	addToFavsListener();

	// Функция для обработки кликов на иконках избранного
	function addToFavsListener() {
		Array.from(document.getElementsByClassName('card__like')).forEach((item) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();

				// Получаем ID карточки, по которой был клик
				const currentId = e.target.closest('.card').dataset.id;

				// Переключаем состояние избранного (добавить/удалить)
				state.favourites.toggleFav(currentId);

				// Обновляем иконку в зависимости от того, в избранном ли объект
				view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
			});
		});
	}
}
