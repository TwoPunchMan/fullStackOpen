import { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import blogService from './services/blogs';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [likes, setLikes] = useState(0);

	const loadBlogsFromDB = () => {
		blogService
			.getAll()
			.then(blogs => {
				setBlogs(blogs);
			});
	}

	useEffect(loadBlogsFromDB, []);

	const addNewBlog = (event) => {
		event.preventDefault();
		const newBlog = {
			title: title,
			author: author,
			url: url,
			likes: likes
		}

		blogService
			.addBlog(newBlog)
			.then(addedBlog => {
				setBlogs(blogs.concat(addedBlog))
			})
			.catch(error => {
				console.log(error);
			});
	}

	const handleTitleChange = (event) => setTitle(event.target.value);
	const handleAuthorChange = (event) => setAuthor(event.target.value);
	const handleUrlChange = (event) => setUrl(event.target.value);
	const handleLikesChange = (event) => setLikes(event.target.value);

  return (
		<div>
			<h1>Blog list app</h1>
			<BlogList blogs={blogs} />
			<BlogForm submitFunc={addNewBlog} inputFuncs={[handleTitleChange, handleAuthorChange, handleUrlChange, handleLikesChange]} inputValues={[title, author, url, likes]} />
		</div>
	)
}

export default App;
