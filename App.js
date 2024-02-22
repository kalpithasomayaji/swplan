
import logo from './logo.svg';
import './App.css';


import React, { useState, useEffect } from 'react';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('');

  const fetchPlanets = async (url) => {
    try {
      const response = await fetch(url || 'https://swapi.dev/api/planets/?format=json');
      const data = await response.json();
      setPlanets(data.results);
      setNextPageUrl(data.next);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <div className="App">
      {planets.map((planet, index) => (
        <div key={index} className="planet-card">
          <h3>{planet.name}</h3>
          <p>Climate: {planet.climate}</p>
          <p>Population: {planet.population}</p>
          <p>Terrain: {planet.terrain}</p>
        </div>
      ))}
      {nextPageUrl && <button onClick={() => fetchPlanets(nextPageUrl)}>Next Page</button>}
    </div>
  );
}

export default App;
