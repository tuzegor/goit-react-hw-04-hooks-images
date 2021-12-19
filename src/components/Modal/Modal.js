import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ picture, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', closePictureByEscape);
    return () => {
      window.removeEventListener('keydown', closePictureByEscape);
    };
  });

  const closePicture = e => {
    if (e.target === e.currentTarget) {
      closeModal(false);
    }
  };

  const closePictureByEscape = e => {
    if (e.code === 'Escape') {
      closeModal(false);
    }
  };

  return (
    <div className={styles.Overlay} onClick={e => closePicture(e)}>
      <div className={styles.Modal}>
        <img id={picture.id} src={picture.largeImageURL} alt={picture.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  picture: PropTypes.object,
  closeModal: PropTypes.func,
};
