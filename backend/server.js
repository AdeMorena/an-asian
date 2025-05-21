const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: ['https://react-lab-riqn.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
const csrfMiddleware = csurf({ cookie: true });
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use(csrfMiddleware);

app.get('/api/comments', async (req, res) => {
  try {
    const commentsCol = db.collection('comments');
    const snapshot = await commentsCol.get();
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const competitors = ['Competitor1', 'Competitor2', 'Competitor3'];
    const containsCompetitor = competitors.some(c =>
      comment.toLowerCase().includes(c.toLowerCase())
    );
    if (containsCompetitor) {
      return res.status(400).json({
        error: 'Comment contains references to competitors',
      });
    }
    const newComment = {
      name,
      rating: Number(rating),
      comment,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection('comments').add(newComment);
    res.status(201).json({ id: docRef.id, ...newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

app.get('/api/message', (req, res) => {
  console.log('Received request for /api/message');
  res.json({ message: 'Hello from the server!' });
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});