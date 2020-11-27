import React, { useEffect } from 'react';
import USAMap from 'react-usa-map';
import './styles/map.css';
import Socket from './Socket';

function Map() {
  useEffect(() => {
    Socket.on('sendState', (data) => {
      alert(data.sendState);
    });
    return () => {
      Socket.off('sendState');
    };
  }, []);

  function mapHandler(event) {
    const state = event.target.dataset.name;
    Socket.emit('state', {
      state,
    });
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
