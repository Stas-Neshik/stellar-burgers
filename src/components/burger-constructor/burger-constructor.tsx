import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store/store';
import { getIngridients } from '../../services/slices/burgerConstructor';
import {
  getorderRequest,
  getOrder,
  clearInfo
} from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(getIngridients);

  const orderRequest = useSelector(getorderRequest);

  const orderModalData = useSelector(getOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };

  const closeOrderModal = () => {
    dispatch(clearInfo());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingridients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
