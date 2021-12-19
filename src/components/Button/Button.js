import styles from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ loadMore }) {
  return (
    <button
      className={styles.Button}
      onClick={() => loadMore(prevState => prevState + 1)}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func,
};
