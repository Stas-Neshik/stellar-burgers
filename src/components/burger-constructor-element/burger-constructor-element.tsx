import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store/store';
import {
  changeIngridient,
  removeIngridient
} from '../..//services/slices/burgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        changeIngridient({ initialIndex: index, finishIndex: index + 1 })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        changeIngridient({ initialIndex: index, finishIndex: index - 1 })
      );
    };

    const handleClose = () => {
      dispatch(removeIngridient({ id: ingredient.id }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
