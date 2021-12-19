import { useState } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const searchbarFormSubmit = e => {
    e.preventDefault();
    onSubmit(searchName);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={searchbarFormSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          value={searchName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setSearchName(e.target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
