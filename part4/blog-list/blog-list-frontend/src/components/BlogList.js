import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  if (blogs.length === 0) {
    return (<ul></ul>);
  }

	return (
    <ul>
      {blogs.map(blog =>
        <Blog data={blog} />
			)}
    </ul>
  )
}

export default BlogList;
