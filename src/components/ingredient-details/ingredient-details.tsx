import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store/store';
import { addAllIngredients } from '../../services/slices/ingridients';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useSelector(addAllIngredients).find(
    (ingridient) => ingridient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
