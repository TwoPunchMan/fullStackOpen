const Blog = ({ data }) => {
	const { title, author, url, likes } = data;

  return (
		<li>
			<h3>Title: <u>{title}</u></h3>
			<h4>Author: {author}</h4>
			<div>Url: {url}</div>
			<div>Number of likes: {likes}</div>
		</li>
	)
}

export default Blog;
