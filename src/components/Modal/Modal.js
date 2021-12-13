import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

function Modal({ onClose, onLeft, onRight, children }) {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  });

  const hendleKeyDown = event => {
    switch (event.code) {
      case 'Esc':
      case 'Escape':
        onClose();
        break;
      case 'Left':
      case 'ArrowLeft':
        onLeft();
        break;
      case 'Right':
      case 'ArrowRight':
        onRight();
        break;
      default:
        break;
    }
  };

  const hendleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose({});
    }
  };

  return (
    <div className={styles.Overlay} onClick={hendleOverlayClick}>
      <div className={styles.Modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onLeft: PropTypes.func,
  onRight: PropTypes.func,
};

export default Modal;
