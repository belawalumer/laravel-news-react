import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSource, setFilterSource] = useState('');

  useEffect(() => {
    fetchArticles();
  }, [filterDate, filterSource]);

  const fetchArticles = async () => {
    try {
      let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=db14bc72d5d9466e89416c66e0a0f1e6';

      if (searchKeyword) {
        url += `&q=${searchKeyword}`;
      }
      if (filterCategory) {
        url += `&category=${filterCategory}`;
      }
    //   if (filterSource) {
    //     url += `&sources=${filterSource}`;
    //   }

      // Calculate the date range based on the selected filterDate
      let fromDate, toDate;
      switch (filterDate) {
        case 'today':
          toDate = new Date().toISOString().slice(0, 10);
          fromDate = new Date().toISOString().slice(0, 10);
          break;
        case 'yesterday':
          toDate = new Date();
          toDate.setDate(toDate.getDate() - 1);
          toDate = toDate.toISOString().slice(0, 10);
          fromDate = new Date();
          fromDate.setDate(fromDate.getDate() - 1);
          fromDate = fromDate.toISOString().slice(0, 10);
          break;
        case 'last30days':
          toDate = new Date().toISOString().slice(0, 10);
          fromDate = new Date();
          fromDate.setDate(fromDate.getDate() - 30);
          fromDate = fromDate.toISOString().slice(0, 10);
          break;
        case 'last7days':
          toDate = new Date().toISOString().slice(0, 10);
          fromDate = new Date();
          fromDate.setDate(fromDate.getDate() - 7);
          fromDate = fromDate.toISOString().slice(0, 10);
          break;
        default:
          // No date filter selected, use default
          break;
      }

      if (fromDate && toDate) {
        url += `&from=${fromDate}&to=${toDate}`;
      }

      const response = await axios.get(url);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleReset = () => {
    setSearchKeyword('');
    setFilterDate('');
    setFilterCategory('');
    setFilterSource('');
    fetchArticles();
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSourceChange = (e) => {
    setFilterSource(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-4">News Feed</h2>

    <form className="mb-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search Articles"
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <select
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={filterCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>

        <select
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={filterDate}
          onChange={handleDateFilterChange}
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>

        {/* <select
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={filterSource}
          onChange={handleSourceChange}
        >
          <option value="">All Sources</option>
          <option value="cnn">CNN</option>
          <option value="the-wall-street-journal">The Wall Street Journal</option>
          <option value="cbs-news">CBS News</option>
        </select> */}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>

        <button
          type="button"
          className="px-4 py-2 ml-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  
      {articles.map((article, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold mb-2">{article.title}</h3>
          <p className="text-gray-600 mb-4">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
  
}

export default NewsFeed;
