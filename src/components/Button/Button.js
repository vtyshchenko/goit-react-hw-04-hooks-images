import PropTypes from 'prop-types';
import styles from './Button.module.scss';

function Button({ onClick }) {
  return (
    <div className={styles.ButtonWrapper}>
      <button className={styles.Button} type="button" onClick={onClick}>
        Load more ...
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
