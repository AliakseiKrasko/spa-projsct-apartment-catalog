import Filter from './filterModel';
import * as view from './filterView';

export default async function (state) {
	// Если в состоянии нет объекта фильтра, создаем его
	if (!state.filter) state.filter = new Filter();

	// Получаем параметры фильтра (например, проекты, комнаты и т.д.)
	await state.filter.getParams();

	// Отрисовываем фильтр с полученными параметрами
	view.render(state.filter.params);

	// Получаем результаты с сервера, исходя из текущих параметров фильтра
	await state.filter.getResults();
	state.results = state.filter.result;

	// Обновляем текст на кнопке фильтра (например, "Показать X объектов")
	view.changeButtonText(state.filter.result.length);

	// Подключаем обработчики событий формы
	const form = document.querySelector('#filter-form');

	// Обработчик изменения параметров фильтра (запрос новых данных при изменении)
	form.addEventListener('change', async function (e) {
		e.preventDefault();
		state.filter.query = view.getInput();  // Получаем текущие параметры
		await state.filter.getResults();       // Получаем результаты с сервера
		state.results = state.filter.result;   // Сохраняем результаты в состояние
		view.changeButtonText(state.filter.result.length);  // Обновляем кнопку
	});

	// Обработчик сброса фильтра
	form.addEventListener('reset', async function () {
		state.filter.query = '';  // Очищаем параметры
		await state.filter.getResults();  // Получаем результаты с сервера
		view.changeButtonText(state.filter.result.length);  // Обновляем кнопку
	});

	// Обработчик отправки формы (поиск)
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		state.emitter.emit('event:render-listing', {});  // Вызываем событие для отображения результатов
	});
}
