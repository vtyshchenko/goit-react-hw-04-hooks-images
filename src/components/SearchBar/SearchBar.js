import PropTypes from 'prop-types';
import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './SearchBar.module.scss';

function SearchBar({ onSubmit }) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (searchText.trim() === '') {
      toast.error('Input search text!');
      return;
    }
    onSubmit({ searchText });
    setSearchText('');
  };

  const handleChange = event => {
    setSearchText(event.target.value.toLowerCase());
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.formButton}>
          <span className={styles.formButtonLabel}>Search</span>
        </button>
        <input
          className={styles.formInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={searchText}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  searchText: PropTypes.string,
};

export default SearchBar;
