import React, { useEffect } from 'react';
import '../styles/style3.css';

function BadCommentPopup({ onClose, response }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{response}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default BadCommentPopup;