import React from 'react'
import {useDispatch} from "react-redux";
import {BURGER_CONSTRUCTOR_DELETE, BURGER_CONSTRUCTOR_SORT} from "../../services/actions/BurgerConstructor";
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import bcStyles from '../BurgerConstructor/BurgerConstructor.module.css';



function DndIngredientsConstructor ({ingredient, index}) {
  const dispatch = useDispatch();
  const ref = React.useRef();
  const ingredientId = ingredient.id;

  const moveIngredient = (dragIndex, hoverIndex) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_SORT,
      dragIndex, hoverIndex
    })
  }

  const [{handlerId}, drop] = useDrop({
    accept: 'ingredientCard',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  })

  const [{isDragging}, drag] = useDrag({
    type: 'ingredientCard',
    item: () => {
      return {ingredientId, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const deleteItem = () => {
    dispatch({
      type: BURGER_CONSTRUCTOR_DELETE,
      payload: ingredient.key
    })
  };

  return (
    <li className={`${bcStyles.listItem} pb-4`} key={ingredient._id} ref={ref} style={{opacity}}>
      <DragIcon type='primary'/>
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image_mobile}
        price={ingredient.price}
        handleClose={deleteItem}
      />
    </li>
  )
}

export default DndIngredientsConstructor;
