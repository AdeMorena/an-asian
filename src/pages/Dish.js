import React, { useState } from 'react';
import '../styles/style.css';

function Dish({ dish, category, index }) {
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <tr>
      <td>{dish.name}</td>
      <td>
        <img src={dish.image} alt={dish.name} className="dish-img" />
      </td>
      <td>{dish.price}</td>
      <td>
        <button className="ingredient-btn" onClick={toggleIngredients}>
          Ingredients
        </button>
        {showIngredients && (
          <div className={`ingredient-popup ${showIngredients ? 'show' : ''}`}>
            {dish.ingredients.map((ingredient, idx) => (
              <span key={idx} className="ingredient-badge">
                {ingredient}
              </span>
            ))}
          </div>
        )}
      </td>
    </tr>
  );
}

export default Dish;