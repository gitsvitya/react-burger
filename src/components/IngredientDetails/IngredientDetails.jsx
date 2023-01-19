import ingredientDetailsStyles from './IngredientDetails.module.css';
import apiPropTypes from '../../utils/propTypes.js';

function IngredientDetails({data}) {


  return (
    <div className={ingredientDetailsStyles.container}>
      <h3 className={`${ingredientDetailsStyles.header} text text_type_main-large pt-10 pr-10 pl-10`}>Детали
        ингредиента</h3>
      <img src={data.image_large} alt={data.name}></img>
      <p className={`text text_type_main-medium pt-4`}>{data.name}</p>
      <div className={`${ingredientDetailsStyles.ingredientsBox} pt-8`}>
        <div className={ingredientDetailsStyles.ingredient}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{data.calories}</p>
        </div>
        <div className={ingredientDetailsStyles.ingredient}>
          <p className='text text_type_main-default text_color_inactive'>Белки</p>
          <p className='text text_type_digits-default text_color_inactive'>{data.proteins}</p>
        </div>
        <div className={ingredientDetailsStyles.ingredient}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{data.proteins}</p>
        </div>
        <div className={ingredientDetailsStyles.ingredient}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{data.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: apiPropTypes.isRequired,
};

export default IngredientDetails
