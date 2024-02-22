import React, { useState, useEffect } from 'react';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentData = await Promise.all(
        planet.residents.map(async (residentUrl) => {
          const response = await fetch(residentUrl);
          return response.json();
        })
      );
      setResidents(residentData);
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card">
      <h3>{planet.name}</h3>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <h4>Residents:</h4>
      <ul>
        {residents.map((resident) => (
          <li key={resident.url}>{resident.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetCard;
