// Отображаем данные о выбранном объекте
export function render(object, isFaved) {
    const appContainer = document.querySelector('#app');

    // HTML-шаблон для страницы объекта
    const markup = `
        <div class="container p-0 pt-5">
            <div class="heading-1">${object.title}, ${object.square} м2 за ${object.price_total} ₽</div>
            <div class="object">
                <div class="object__photo">
                    <div class="object__photo-wrapper">
                        <img src="${object.image}" alt="Фото объекта" />
                    </div>
                </div>
                <div class="object__desc">
                    <div class="object__desc-sector">ЖК ${object.complex_name}</div>
                    <div class="object__desc-name">
                        <div class="object__desc-title">${object.title}</div>
                        <div class="object__desc-art">${object.scu}</div>
                        <button id="addToFavouriteBtn" class="button-favourite ${isFaved ? 'button-favourite--active' : ''}">
                            <i class="fas fa-heart"></i>
                            <span>${isFaved ? 'В избранном' : 'В избранное'}</span>
                        </button>
                    </div>
                    <div class="object__desc-details">
                        <div class="params">
                            <div class="params__item">
                                <div class="params__definition">Корпус</div>
                                <div class="params__value">${object.building}</div>
                            </div>
                            <div class="params__item">
                                <div class="params__definition">Этаж</div>
                                <div class="params__value">${object.floor}</div>
                            </div>
                            <div class="params__item">
                                <div class="params__definition">Номер</div>
                                <div class="params__value">${object.flat_number}</div>
                            </div>
                            <div class="params__item">
                                <div class="params__definition">Комнат</div>
                                <div class="params__value">${object.rooms}</div>
                            </div>
                        </div>
                    </div>
                    <div class="details">
                        <div class="details__row">
                            <div class="details__name">Стоимость</div>
                            <div class="details__value details__value--price">${object.price_total} ₽</div>
                        </div>
                        <div class="details__row">
                            <div class="details__name">Цена за м2</div>
                            <div class="details__value">${object.price_sq_m} ₽/м2</div>
                        </div>
                        <div class="details__row">
                            <div class="details__name">Площадь</div>
                            <div class="details__value">${object.square} м2</div>
                        </div>
                    </div>
                    <button class="button-order">Забронировать</button>
                </div>
            </div>
        </div>
        <div class="container p-0">
            <a href="/" class="back-to-results">← Вернуться к результатам поиска</a>
        </div>
    `;

    // Шаблон для модального окна бронирования
    const markupModal = `
        <div class="modal-wrapper none">
            <div class="modal">
                <div class="modal__header">
                    <div class="modal__title">Заявка на бронирование</div>
                    <div class="modal__details">Квартира <span>96</span> в Первом квартале Дом 5</div>
                    <div class="modal__details-art">ГЕН-112-42</div>
                </div>
                <form class="modal__form">
                    <div class="modal__form-content">
                        <div class="formgroup">
                            <label for="form-name" class="modal__form-input-label">Имя</label>
                            <input type="text" id="form-name" class="modal__form-input" placeholder="Введите имя" />
                        </div>
                        <div class="formgroup">
                            <label for="form-phone" class="modal__form-input-label">Телефон</label>
                            <input type="text" id="form-phone" class="modal__form-input" placeholder="+7 (XXX) XXX-XX-XX" />
                        </div>
                        <div class="formgroup formgroup--checkbox">
                            <input type="checkbox" id="policy" checked />
                            <label for="policy" class="policy-text">Я согласен на обработку моих персональных данных.</label>
                        </div>
                    </div>
                    <input type="submit" class="modal__submit" value="Отправить заявку" />
                </form>
                <button class="modal__close">Закрыть</button>
            </div>
        </div>
    `;

    // Вставляем разметку на страницу
    appContainer.insertAdjacentHTML('beforeend', markup);
    appContainer.insertAdjacentHTML('beforeend', markupModal);
}

// Функция для показа модального окна
export function showModal() {
    document.querySelector('.modal-wrapper').classList.remove('none');
}

// Функция для скрытия модального окна
export function hideModal() {
    document.querySelector('.modal-wrapper').classList.add('none');
}

// Получаем данные из формы бронирования
export function getInput() {
    return {
        name: document.querySelector('#form-name').value,
        phone: document.querySelector('#form-phone').value,
    };
}

// Очищаем поля формы после отправки
export function clearInput() {
    document.querySelector('#form-name').value = '';
    document.querySelector('#form-phone').value = '';
}

// Переключаем состояние кнопки избранного
export function toggleFavouriteButton(isFaved) {
    const btn = document.querySelector('#addToFavouriteBtn');
    if (isFaved) {
        btn.classList.add('button-favourite--active');
        btn.querySelector('span').textContent = 'В избранном';
    } else {
        btn.classList.remove('button-favourite--active');
        btn.querySelector('span').textContent = 'В избранное';
    }
}
