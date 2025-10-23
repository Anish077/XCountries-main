import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://xcountries-backend.labs.crio.do/all');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load countries data');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <h1>Country Flags Display</h1>
        <div className="loading">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h1>Country Flags Display</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Country Flags Display</h1>
      <div className="countries-grid">
        {countries.map((country) => (
          <div key={country.alpha3Code || country.code} className="country-card">
            <img 
              src={country.flags?.png || country.flag} 
              alt={`Flag of ${country.name}`}
              className="country-flag"
            />
            <div className="country-name">{country.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;