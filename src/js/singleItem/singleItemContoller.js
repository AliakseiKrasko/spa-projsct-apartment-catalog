import SingleItem from './singleItemModel.js';
import * as view from './singleItemView.js';

export default async function (state) {
    // Создаем новый объект SingleItem, используя ID объекта из маршрута
    state.singleItem = new SingleItem(state.routeParams);

    // Получаем данные об объекте с сервера
    await state.singleItem.getItem();

    // Отображаем страницу объекта, передавая данные о нем и статус избранного
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // Открытие модального окна при клике на кнопку "Забронировать"
    document.querySelector('.button-order').addEventListener('click', () => {
        view.showModal();
    });

    // Закрытие модального окна при клике на кнопку "Закрыть"
    document.querySelector('.modal__close').addEventListener('click', () => {
        view.hideModal();
    });

    // Закрытие модального окна при клике на фон модального окна
    document.querySelector('.modal-wrapper').addEventListener('click', (e) => {
        if (!e.target.closest('.modal')) {
            view.hideModal();
        }
    });

    // Обработка отправки формы модального окна
    document.querySelector('.modal__form').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Получаем данные формы
        const formData = view.getInput();

        // Отправляем форму на сервер
        await state.singleItem.submitForm(formData);

        // Обрабатываем ответ сервера
        const response = state.singleItem.response;
        if (response.message === 'Bid Created') {
            alert('Ваша заявка успешно получена!');
            view.hideModal();
            view.clearInput();
        } else if (response.message === 'Bid Not Created') {
            response.errors.forEach((item) => {
                alert(item);
            });
        }
    });

    // Обработка клика на кнопку "Добавить в избранное"
    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        // Переключаем статус избранного
        state.favourites.toggleFav(state.singleItem.id);

        // Обновляем состояние кнопки "Избранное"
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    });
}
