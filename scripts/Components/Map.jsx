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
        fill: 'skyblue',
      },
      NY: {
        fill: 'skyblue',
      },
      ME: {
        fill: 'skyblue',
      },
      VT: {
        fill: 'skyblue',
      },
      NH: {
        fill: 'skyblue',
      },
      MA: {
        fill: 'skyblue',
      },
      RI: {
        fill: 'skyblue',
      },
      CT: {
        fill: 'skyblue',
      },
      DE: {
        fill: 'skyblue',
      },
      MD: {
        fill: 'skyblue',
      },
      PA: {
        fill: 'plum',
      },
      VA: {
        fill: 'skyblue',
      },
      WV: {
        fill: 'indianred',
      },
      NC: {
        fill: 'indianred',
      },
      OH: {
        fill: 'indianred',
      },
      SC: {
        fill: 'indianred',
      },
      GA: {
        fill: 'indianred',
      },
      FL: {
        fill: 'plum',
      },
      AL: {
        fill: 'indianred',
      },
      TN: {
        fill: 'indianred',
      },
      KY: {
        fill: 'indianred',
      },
      IN: {
        fill: 'indianred',
      },
      MI: {
        fill: 'plum',
      },
      WI: {
        fill: 'plum',
      },
      IL: {
        fill: 'skyblue',
      },
      MS: {
        fill: 'indianred',
      },
      LA: {
        fill: 'indianred',
      },
      AR: {
        fill: 'indianred',
      },
      MO: {
        fill: 'indianred',
      },
      IA: {
        fill: 'indianred',
      },
      MN: {
        fill: 'skyblue',
      },
      ND: {
        fill: 'indianred',
      },
      SD: {
        fill: 'indianred',
      },
      NE: {
        fill: 'indianred',
      },
      KS: {
        fill: 'indianred',
      },
      OK: {
        fill: 'indianred',
      },
      TX: {
        fill: 'indianred',
      },
      MT: {
        fill: 'indianred',
      },
      WY: {
        fill: 'indianred',
      },
      CO: {
        fill: 'skyblue',
      },
      NM: {
        fill: 'indianred',
      },
      AZ: {
        fill: 'skyblue',
      },
      AK: {
        fill: 'indianred',
      },
      HI: {
        fill: 'skyblue',
      },
      UT: {
        fill: 'indianred',
      },
      ID: {
        fill: 'indianred',
      },
      WA: {
        fill: 'skyblue',
      },
      OR: {
        fill: 'skyblue',
      },
      NV: {
        fill: 'skyblue',
      },
      CA: {
        fill: 'skyblue',
      },
    };
  }

  return (
    <div className="map">
      <div className="flex-container-map">
        <div className="box1"> </div>
        <div className="republic"> Republic </div>
        <div className="box2"> </div>
        <div className="democratic"> Democratic </div>
        <div className="box3"> </div>
        <div className="competitive"> Competitive </div>
      </div>
      <USAMap onClick={mapHandler} customize={statesCustomConfig()} />
    </div>
  );
}

export default Map;
