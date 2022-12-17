const BlogForm = ({ submitFunc, inputFuncs, inputValues }) => {
	const [handleTitleChange, handleAuthorChange, handleUrlChange, handleLikesChange] = [...inputFuncs];
	const [title, author, url, likes] = [...inputValues];

	return (
		<form onSubmit={submitFunc}>
			title: <input value={title} onChange={handleTitleChange} /><br/>
			author: <input value={author} onChange={handleAuthorChange} /><br/>
			url: <input value={url} onChange={handleUrlChange} /><br/>
			likes: <input value={likes} onChange={handleLikesChange} /><br/>
			<button type="submit">Add new blog</button>
		</form>
	)
}

export default BlogForm;
