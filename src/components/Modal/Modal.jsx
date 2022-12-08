import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modStyles from './Modal.module.css';
import PropTypes from 'prop-types';

// Создаем функцию Modal, которая будет принимать на вход контент для отображения (children),
// а также хук для состояни закрытия и рендерить соответствующее окно.
const Modal = ({children, closeModal}) => {

  // Ищем div в index.html, где генерируем модальное окно
  const container = document.querySelector('#modal');

  useEffect(() => {
    // Добавляем слушатель закрытия окна по клавише Escape
    function closeModalByEsc(evt) {
      evt.key === 'Escape' && closeModal();
    }

    document.addEventListener('keydown', closeModalByEsc)

    // Убираем слушатель закрытия окна по клавише Escape после зактия окна для оптимизации использования памяти
    return () => {
      document.removeEventListener('keydown', closeModalByEsc)
    }
  }, [])

  // Создаем портал, выводящий модальное окно, включая универсальную кнопку для закрытия окна по клику,
  // передаваемого контента (children) и оверлея, который также закрывает окно по клику, привязывая их к #modal
  return ReactDOM.createPortal(
    <>
      <div className={modStyles.modalWindow}>
        <div className={modStyles.closeIcon}>
          <CloseIcon type='primary' onClick={closeModal}/>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={closeModal}/>
    </>, container
  )
}

// Проверяем данные, принимаемые Modal, на соответствие форматам
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal
