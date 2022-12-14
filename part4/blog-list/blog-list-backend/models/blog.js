const mongoose = require('mongoose');
const url = process.env.MONGODB_URI

console.log('Connecting to', url);
mongoose
  .connect(url)
  .then(result => {
    console.log('Connected to mongoDB');
  })
  .catch(error => {
    console.log('Error connecting to mongoDB: ', error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);
