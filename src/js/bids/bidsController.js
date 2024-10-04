import * as view from './bidsView.js';
import Bids from './bidsModel.js';

export default async function (state) {
    // Проверяем, существует ли объект заявок в состоянии, если нет, создаем новый
    if (!state.bids) state.bids = new Bids();

    // Получаем заявки с сервера
    await state.bids.getBids();

    // Отображаем заявки на странице, передавая данные в представление (view)
    view.renderBids(state.bids.bids);
}
