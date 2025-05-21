import React from 'react';
import '../styles/style.css';

function Reviews({ reviews }) {
  return (
    <section className="reviews-section">
      <h2>Customer Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p className="review-text">"{review.text}"</p>
            <div className="review-author">
              <h4>{review.author}</h4>
              <p>{review.role}</p>
              <p>Rating: {'★'.repeat(review.rating)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;