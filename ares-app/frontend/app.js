const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Form data read karne ke liye
app.use(express.json());

// Task 1 mein localhost use hoga; Task 2 & 3 mein env variable se Backend IP pass kar sakte hain
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000/api/comments';

// Page load hone par backend se saare comments fetch karke dikhayega
app.get('/', async (req, res) => {
  try {
    const response = await fetch(BACKEND_URL);
    const data = await response.json();
    res.render('index', { comments: data.comments || [], error: null });
  } catch (err) {
    console.error(err);
    res.render('index', { comments: [], error: 'Backend se connect nahi ho pa raha!' });
  }
});

// Submit button dabane par form data Flask backend ko bhejega
app.post('/submit', async (req, res) => {
  try {
    const { name, comment } = req.body;
    await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, comment })
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Frontend running on port 3000');
});