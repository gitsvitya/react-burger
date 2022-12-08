import modOverStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

// Создаем функцию ModalOverlay, которая будет рендерить блок, имитирующий задний фон.
// Принимает на вход также хук для состояни закрытия себя и окна Modal (closeModal).
const ModalOverlay = ({ onClick }) => {
  return (
    <div className={modOverStyles.modalOverlay} onClick={onClick}></div>
  )
}

// Проверяем данные, принимаемые ModalOverlay, на соответствие форматам
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ModalOverlay
