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
        fill: 'navy',
      },
      ME: {
        fill: 'navy',
      },
      VT: {
        fill: 'navy',
      },
      NH: {
        fill: 'navy',
      },
      MA: {
        fill: 'navy',
      },
      RI: {
        fill: 'navy',
      },
      CT: {
        fill: 'navy',
      },
      DE: {
        fill: 'navy',
      },
      MD: {
        fill: 'navy',
      },
      PA: {
        fill: 'grey',
      },
      VA: {
        fill: 'navy',
      },
      WV: {
        fill: 'red',
      },
      NC: {
        fill: 'red',
      },
      OH: {
        fill: 'red',
      },
      SC: {
        fill: 'red',
      },
      GA: {
        fill: 'red',
      },
      FL: {
        fill: 'grey',
      },
      AL: {
        fill: 'red',
      },
      TN: {
        fill: 'red',
      },
      KY: {
        fill: 'red',
      },
      IN: {
        fill: 'red',
      },
      MI: {
        fill: 'grey',
      },
      WI: {
        fill: 'grey',
      },
      IL: {
        fill: 'navy',
      },
      MS: {
        fill: 'red',
      },
      LA: {
        fill: 'red',
      },
      AR: {
        fill: 'red',
      },
      MO: {
        fill: 'red',
      },
      IA: {
        fill: 'red',
      },
      MN: {
        fill: 'navy',
      },
      ND: {
        fill: 'red',
      },
      SD: {
        fill: 'red',
      },
      NE: {
        fill: 'red',
      },
      KS: {
        fill: 'red',
      },
      OK: {
        fill: 'red',
      },
      TX: {
        fill: 'red',
      },
      MT: {
        fill: 'red',
      },
      WY: {
        fill: 'red',
      },
      CO: {
        fill: 'navy',
      },
      NM: {
        fill: 'red',
      },
      AZ: {
        fill: 'navy',
      },
      AK: {
        fill: 'red',
      },
      HI: {
        fill: 'navy',
      },
      UT: {
        fill: 'red',
      },
      ID: {
        fill: 'red',
      },
      WA: {
        fill: 'navy',
      },
      OR: {
        fill: 'navy',
      },
      NV: {
        fill: 'navy',
      },
      CA: {
        fill: 'navy',
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
