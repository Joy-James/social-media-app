import React, { useState } from 'react';
import axios from 'axios';
import "./search.css"

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.example.com/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log('Error fetching search results:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results">
        {searchResults.map((result) => (
          <div className="search-result" key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
            {/* Additional information about the search result */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchComponent;