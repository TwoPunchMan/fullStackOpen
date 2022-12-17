require('dotenv').config();
const mongoose = require('mongoose');

const Blog = require('./models/blog');

if (process.argv.length < 3) {
  console.log('Need a password as argument');
	process.exit(1);
}
