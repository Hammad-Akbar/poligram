import React, { useState, useEffect } from 'react';
import USAMap from 'react-usa-map';
import './styles/map.css';
import Socket from './Socket';

function Map() {
  const [stateObj, setStateObj] = useState({});
  const [showData, setShowData] = useState(false);
  useEffect(() => {
    Socket.on('sendState', (data) => {
      setStateObj(data);
      setShowData(true);
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

  function showStateData() {
    if (showData) {
      return (
        <>
          <div>
            <div>
              {stateObj.sendState}
            </div>
            <div>
              {stateObj.sendPop}
            </div>
            <div>
              {stateObj.sendVotes}
            </div>
            <div>
              {stateObj.sendSenators}
            </div>
            <div>
              {setStateObj.sendHouse}
            </div>
            <a href={stateObj.sendWeb}> Gov Website </a>
          </div>
        </>
      );
    }
  }

  function statesCustomConfig() {
    return {
      NJ: {
        fill: 'dodgerblue',
      },
      NY: {
        fill: 'dodgerblue',
      },
      ME: {
        fill: 'dodgerblue',
      },
      VT: {
        fill: 'dodgerblue',
      },
      NH: {
        fill: 'dodgerblue',
      },
      MA: {
        fill: 'dodgerblue',
      },
      RI: {
        fill: 'dodgerblue',
      },
      CT: {
        fill: 'dodgerblue',
      },
      DE: {
        fill: 'dodgerblue',
      },
      MD: {
        fill: 'dodgerblue',
      },
      PA: {
        fill: 'darkorchid',
      },
      VA: {
        fill: 'dodgerblue',
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
        fill: 'darkorchid',
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
        fill: 'darkorchid',
      },
      WI: {
        fill: 'darkorchid',
      },
      IL: {
        fill: 'dodgerblue',
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
        fill: 'dodgerblue',
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
        fill: 'dodgerblue',
      },
      NM: {
        fill: 'indianred',
      },
      AZ: {
        fill: 'dodgerblue',
      },
      AK: {
        fill: 'indianred',
      },
      HI: {
        fill: 'dodgerblue',
      },
      UT: {
        fill: 'indianred',
      },
      ID: {
        fill: 'indianred',
      },
      WA: {
        fill: 'dodgerblue',
      },
      OR: {
        fill: 'dodgerblue',
      },
      NV: {
        fill: 'dodgerblue',
      },
      CA: {
        fill: 'dodgerblue',
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
      {showStateData()}
      <USAMap onClick={mapHandler} customize={statesCustomConfig()} />
    </div>
  );
}

export default Map;
