const BlogList = (blogs) => {
  return (
		<ul>
			{blogs.map(blog =>
				<li>
					<h3>Title</h3>
					<h4>Author</h4>
					<div>Url</div>
					<div>likes</div>
				</li>
			)}
		</ul>
	)
}

export default BlogList;
