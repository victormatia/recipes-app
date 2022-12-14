import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CardDoneRecipe from '../components/CardDoneRecipe';
import '../css/DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(local);
  }, []);

  const filterByType = ({ target }) => {
    if (target.name === 'meal') {
      const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterMeals = localDone.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterMeals);
    } else if (target.name === 'drink') {
      const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterDrinks = localDone.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterDrinks);
    } else {
      const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(localDone);
    }
  };

  return (
    <div>
      <Header />
      <motion.section
        className="Filters"
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
      >
        <legend>
          <input
            className="Filter-btn-meal"
            data-testid="filter-by-meal-btn"
            name="meal"
            type="button"
            alt="botão"
            onClick={ filterByType }
          />
          <p>Meals</p>
        </legend>
        <legend>
          <input
            className="Filter-drink"
            data-testid="filter-by-drink-btn"
            name="drink"
            type="button"
            alt="botão"
            onClick={ filterByType }
          />
          <p>Drinks</p>
        </legend>
        <legend>
          <input
            className="Filter-btn-all"
            data-testid="filter-by-all-btn"
            name="all"
            type="button"
            alt="botão"
            onClick={ filterByType }
          />
          <p>All</p>
        </legend>

      </motion.section>
      <motion.section
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        className="cards__recipes done"
      >
        {
          doneRecipes?.map((recipe, index) => (
            <CardDoneRecipe recipe={ recipe } key={ index } index={ index } />))

        }
      </motion.section>
    </div>
  );
}

export default DoneRecipes;
