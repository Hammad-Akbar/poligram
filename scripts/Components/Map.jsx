import React from 'react';
import USAMap from 'react-usa-map';
import './styles/map.css';

function Map() {
  function mapHandler(event) {
    alert(event.target.dataset.name);
  }

  function statesCustomConfig() {
    return {
      NJ: {
        fill: 'navy',
      },
      NY: {
        fill: '#CC0000',
      },
    };
  }

  return (
    <div className="map">
      <USAMap onClick={mapHandler} customize={statesCustomConfig()} />
    </div>
  );
}

export default Map;
