import React, { useState, useEffect } from 'react';
import '../styles/style3.css';
import BadCommentPopup from './BadCommentPopup';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

function About() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [badComment, setBadComment] = useState('');
  const [user, setUser] = useState(null);
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  const badWords = [
    { phrase: 'поганий заклад', response: 'Сам ти поганий!' },
    { phrase: 'жахлива їжа', response: 'Їжа топ, а твій смак — flop!' },
    { phrase: 'гірше не буває', response: 'Ой, а ми думали, що ти про свій настрій!' },
    { phrase: 'не смачно', response: 'Може, ложку перевернув?' },
  ];

  const convertToDate = (timestamp) => {
    try {
      if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate();
      } else if (timestamp instanceof Date) {
        return timestamp;
      } else if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
        return new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
      } else {
        return new Date();
      }
    } catch (error) {
      console.error('Error converting timestamp:', error);
      return new Date();
    }
  };

  useEffect(() => {
    const fetchServerMessage = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/message`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setServerMessage(data.message);
      } catch (error) {
        console.error('Error fetching server message:', error.message);
        setServerMessage('Failed to load server message');
      }
    };
    fetchServerMessage();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setName(currentUser.email);
    });

    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'comments'));
        const commentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (comment) {
      const commentLower = comment.toLowerCase();
      const matchedBadWord = badWords.find((bad) =>
        commentLower.includes(bad.phrase)
      );
      const competitors = ['Competitor1', 'Competitor2', 'Competitor3'];
      const containsCompetitor = competitors.some(c =>
        commentLower.includes(c.toLowerCase())
      );

      if (containsCompetitor) {
        setBadComment('Comment contains references to competitors');
        setShowPopup(true);
        return;
      }

      try {
        const newComment = {
          name: user.email,
          rating,
          comment,
          timestamp: serverTimestamp()
        };
        const docRef = await addDoc(collection(db, 'comments'), newComment);
        setComments([{ id: docRef.id, ...newComment }, ...comments]);

        if (matchedBadWord) {
          setBadComment(matchedBadWord.response);
          setShowPopup(true);
        }

        setComment('');
        setRating(5);
      } catch (error) {
        console.error('Error adding comment:', error);
        setServerMessage('Failed to add comment');
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setBadComment('');
  };

  return (
    <main>
      <div className="about">
        <h2>About Us</h2>
        <p>
          Welcome to AnAsian, a place where traditional Asian cuisine meets modern presentation. We take care of every dish to give you an unforgettable gastronomic experience.
        </p>
        <p><strong>Server says:</strong> {serverMessage}</p>
      </div>
      <div className="map">
        <h3>Where we are?</h3>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.3628051570986!2d24.011861877076235!3d49.835640171481316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7a31f0dccd%3A0x9869cc7025bc8e3f!2z0J3QsNGG0LjQvtC90LDQu9GM0L3Ri9C5INGD0L3QuNCy0LXRgNGB0LjRgtC10YIgwqvQm9GM0LLQvtCy0YHQutCw0Y8g0L_QvtC70LjRgtC10YXQvdC40LrQsMK7!5e0!3m2!1sru!2sua!4v1744140484105!5m2!1sru!2sua"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Anasian Restaurant Location"
          ></iframe>
        </div>
      </div>
      <section className="comments-section">
        <h3>Leave Your Feedback</h3>
        {user ? (
          <form id="commentForm" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Your Name"
              value={name}
              readOnly
            />
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <textarea
              id="commentText"
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <p>
            Please <a href="/login">log in</a> to leave a comment.
          </p>
        )}
        <ul id="commentList">
          {comments.map((c) => (
            <li key={c.id || Math.random()}>
              <strong>{c.name}</strong> - {c.rating}/5<br />
              {c.comment} ({convertToDate(c.timestamp).toLocaleString()})
            </li>
          ))}
        </ul>
      </section>
      {showPopup && <BadCommentPopup onClose={closePopup} response={badComment} />}
    </main>
  );
}

export default About;