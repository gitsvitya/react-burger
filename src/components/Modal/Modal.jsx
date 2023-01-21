import modStyles from './Modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({children, closeModal}) => {

  const container = document.querySelector('#modal');

  React.useEffect(() => {
    function closeModalByEsc(evt) {
      evt.key === 'Escape' && closeModal();
    }

    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    }
  }, [closeModal]);

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
  );
}

export default Modal
