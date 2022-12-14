const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const Blog = require('./models/blog');
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
		.catch(error => next(error));
});

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(savedBlogToDB => {
      response.status(201).json(savedBlogToDB)
    })
		.catch(error => next(error));
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
