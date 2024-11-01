import {
  orderReducer,
  clearInfo,
  getOrderByNumber,
  createOrder
} from '../src/services/slices/order';

describe('[orderSlice] Проверка слайса', () => {
  const initialState = {
    order: null,
    loading: false
  };

  const orderMock = [
    {
      _id: '1',
      status: 'готов',
      name: 'Бургер',
      createdAt: '2024-08-30T00:00:00.000Z',
      updatedAt: '2024-08-30T00:00:00.000Z',
      number: 123,
      ingredients: ['Булка', 'Начинка']
    }
  ];

  it('[1] Удаление заказа', () => {
    const state = {
      ...initialState,
      orderMock
    };

    const action = clearInfo();
    const currentState = orderReducer(state, action);

    expect(currentState).toEqual(initialState);
  });

  it('[2 Получение заказа pending]', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('[3] Получение заказаа fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [orderMock] }
    };

    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(orderMock);
  });

  it('[4] Получение заказаа rejected', () => {
    const action = { type: getOrderByNumber.rejected.type };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
  });

  it('[5] Создание заказа pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('[6] Создание заказа fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: orderMock }
    };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(orderMock);
  });

  it('[7] Создание заказа rejected', () => {
    const action = { type: createOrder.rejected.type };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
  });
});
