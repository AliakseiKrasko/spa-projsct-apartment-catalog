import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventEmitter from './utils/EventEmitter';
import Favourites from './favourites/fovouritesModel';

// Объект состояния приложения (state), где хранятся результаты, эмиттер событий и избранное
const state = {
	results: [],  // Массив для хранения результатов
	emitter: new EventEmitter(),  // Экземпляр эмиттера для управления событиями
	favourites: new Favourites(), // Экземпляр избранного
	routeParams: ''  // Параметры маршрута
};

// Маршруты приложения с привязкой к соответствующим компонентам
const routes = [
	{ path: '/', component: homePage },  // Главная страница
	{ path: 'item', component: singleItem },  // Страница одного элемента
	{ path: 'favourites', component: favouritesPage },  // Страница избранного
	{ path: 'bids', component: bidsPage },  // Страница заявок
];

// Функция для поиска компонента по пути
function findComponentByPath(path, routes) {
	return routes.find(route => route.path === path);  // Возвращает компонент, если путь найден
}

// Основная функция маршрутизации
function router() {
	// Разделение пути на массив (по хешу)
	const pathArray = location.hash.split('/');
	let currentPath = pathArray[0] === '' ? '/' : pathArray[1] || '/';  // Определение текущего пути

	state.routeParams = pathArray[2] || '';  // Сохранение параметров маршрута (если они есть)

	// Проверка, существует ли маршрут, если нет — отобразить страницу ошибки
	const route = findComponentByPath(currentPath, routes);
	if (!route) {
		console.warn(`Route "${currentPath}" is not valid, rendering error page.`);  // Предупреждение в консоль
	}
	const { component = errorPage } = route || {};  // Если маршрут не найден, используем компонент ошибки

	// Вызов компонента для отображения
	component(state);
}

// Подписка на события изменения хеша и загрузки страницы для запуска маршрутизации
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
