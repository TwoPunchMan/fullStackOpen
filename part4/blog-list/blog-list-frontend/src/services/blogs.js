import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const addBlog = (newBlog) => {
  const request = axios.post(baseUrl, newBlog);
  return request.then(response => response.data);
}

const blogService = { getAll, addBlog };
export default blogService;
