import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritePageButton from './FavoritePageButton';
import ShareButtonDone from './ShareButtonDone';
import Footer from './Footer';

function CardFavoriteRecipe({ recipe, index, setFavoriteRecipes }) {
  const { type, id } = recipe;
  const url = type === 'meal' ? `/meals/${id}`
    : `/drinks/${id}`;

  return (
    <div>
      <Link to={ url }>
        <div
          className="card"
          style={ {
            background: `url(${recipe.image})`,
            backgroundSize: 'cover',
          } }
        >
          <div className="gradient">
            <h3
              className="name__recipe"
            >
              {recipe.name}
            </h3>
            <br />
            {
              recipe.type === 'meal' ? (
                <h3
                  className="category__recipe"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </h3>
              ) : (
                <h3
                  className="category__recipe"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </h3>
              )
            }
          </div>
        </div>
      </Link>
      <section className="buttons">
        <FavoritePageButton
          index={ index }
          id={ id }
          setFavoriteRecipes={ setFavoriteRecipes }
        />
        <ShareButtonDone recipe={ recipe } index={ index } />
      </section>
      <Footer />
    </div>
  );
}

CardFavoriteRecipe.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape(),
  }),
}.isRequired;

export default CardFavoriteRecipe;
