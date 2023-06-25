import { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import Axios from 'axios';

export const SideNavbar = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [blogs, setBlogs] = useState([]);

  const getCategory = async () => {
    try {
      const response = await Axios.get(
        'https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory'
      );
      setCategory(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBlogsByCategory = async (categoryId) => {
    try {
      const response = await Axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?category=${categoryId}`
      );
      setBlogs(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    getBlogsByCategory(selectedCategoryId);
  };

  return (
    <div>
      <Select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Pilih Kategori</option>
        {category.map((v, i) => (
          <option key={i} value={v.id}>
            {v.name}
          </option>
        ))}
      </Select>

      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};