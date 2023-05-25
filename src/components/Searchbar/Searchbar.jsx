import css from './Searchbar.module.css'
// import React, { Component } from "react";
import PropTypes from 'prop-types';

 export default function Searchbar ({onSubmit}) {
     
    const handleSubmit = (e) => {
        e.preventDefault();
        const { inputFind } = e.currentTarget;
        onSubmit(inputFind.value);
        inputFind.value = '';
     }
     
         return <header className={css.Searchbar}>
             <form onSubmit={handleSubmit} className={css.SearchForm}>
                 <button type="submit" className={css.SearchForm_button}>
                     <span className={css.SearchForm_button_label}>Search</span>
                 </button>

                 <input
                     className={css.SearchForm_input}
                     type="text"
                     autoComplete="off"
                     autoFocus
                     placeholder="Search images and photos"
                     name='inputFind'
                 />
             </form>
         </header>
     
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
