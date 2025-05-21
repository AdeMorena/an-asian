import React from 'react';

function IngredientsBlock({ ingredients, show, id }) {
  return (
    <div
      className={`ingredient-popup ${show ? 'fade-in' : 'fade-out'}`}
      id={id}
      style={{ display: show ? 'block' : 'none' }}
    >
      {ingredients.map((ingr, i) => (
        <span key={i} className="ingredient-badge">
          {ingr}
        </span>
      ))}
    </div>
  );
}

export default IngredientsBlock;