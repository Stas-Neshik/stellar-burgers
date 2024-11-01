import {
  initialState,
  constructorReducer,
  addIngredient,
  removeIngredient,
  clearIngredients,
  changeIngredient,
} from '../src/services/slices/burgerConstructor';

describe('[burgerConstructorSlice] Проверка слайса', () => {
  const bunMock = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  };

  const ingredientMock = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  it('[1] Добавление булки', () => {
    const action = addIngredient(bunMock);
    const state = constructorReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      bun: { ...bunMock, id: expect.any(String) }
    });
  });

  it('[2] Добавление ингредиента', () => {
    const action = addIngredient(ingredientMock);
    const state = constructorReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredients: [{ ...ingredientMock, id: expect.any(String) }]
    });
  });

  it('[3] Удаление ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [{ ...ingredientMock, id: '2' }]
    };

    const action = removeIngredient('2');
    const currentState = constructorReducer(state, action);

    expect(currentState).toEqual(state);
  });

  it('[4] Очистка заказа', () => {
    const state = {
      bun: { ...bunMock, id: '1' },
      ingredients: [{ ...ingredientMock, id: '2' }]
    };

    const action = clearIngredients();
    const currentState = constructorReducer(state, action);
    expect(currentState).toEqual(initialState);
  });

  it('[5] Изменение списка ингридиента', () => {
    const state = {
      ...initialState,
      ingredients: [
        { ...ingredientMock, id: '1', name: 'Ингредиент 1' },
        { ...ingredientMock, id: '2', name: 'Ингредиент 2' }
      ]
    };
    const action = changeIngredient({ initialIndex: 1, finishIndex: 0 });
    const currentState = constructorReducer(state, action);

    expect(currentState.ingredients).toEqual([
      { ...ingredientMock, id: '2', name: 'Ингредиент 2' },
      { ...ingredientMock, id: '1', name: 'Ингредиент 1' }
    ]);
  });
});
