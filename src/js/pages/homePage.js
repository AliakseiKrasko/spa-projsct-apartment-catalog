import filter from './../filter/filterController';
import listing from './../listing/listingController';

export default async function (state) {
    // Очищаем контейнер с id="app"
    document.querySelector('#app').innerHTML = '';

    // Отображаем фильтр и передаем состояние (асинхронная функция)
    await filter(state);

    // Отображаем список объектов на основе фильтра
    listing(state);
}
