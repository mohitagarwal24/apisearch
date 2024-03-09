import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [query, setQuery] = useState('');
  const [beers, setBeers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beersPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${beersPerPage}`);
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, beersPerPage]);

  const search = async () => {
    try {
      const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${query}`);
      const data = await response.json();
      setBeers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>Beer Search</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for beers..."
        />
        <button className="search-button" onClick={search}>Search</button>
      </div>

      <div className="beer-container">
        {beers.map((beer) => (
          <div key={beer.id} className="card">
            <h2>{beer.name}</h2>
            <p>{beer.description}</p>
            <img src={beer.image_url} alt={beer.name} />
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(25 / beersPerPage) }).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
