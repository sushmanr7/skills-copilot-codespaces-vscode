// Create web server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/Comment');

mongoose
  .connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());

// Create a new comment
app.post('/comments', async (req, res) => {
  const { name, email, comment } = req.body;
  const newComment = new Comment({ name, email, comment });
  await newComment.save();
  res.status(201).json(newComment);
});

// Get all comments
app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.status(200).json(comments);
});

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});