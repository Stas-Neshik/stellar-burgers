import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store/store';
import {
  changeIngredient,
  removeIngredient
} from '../..//services/slices/burgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        changeIngredient({ initialIndex: index, finishIndex: index + 1 })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        changeIngredient({ initialIndex: index, finishIndex: index - 1 })
      );
    };
    const handleClose = () => {
      dispatch(removeIngredient({ id: ingredient.id }));
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
