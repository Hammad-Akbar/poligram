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

  const handleToggle = () => {
    setShowData(false);
  };

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
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className="show-state-data" onClick={handleToggle}>
            <div>
              <strong className="bold"> State: </strong>
              {' '}
              {stateObj.sendState}
            </div>
            <div>
              <strong className="bold"> Population: </strong>
              {' '}
              {stateObj.sendPop}
            </div>
            <div>
              <strong className="bold"> Senators: </strong>
              {' '}
              {stateObj.sendSenators}
            </div>
            <div>
              <strong className="bold"> House of Representatives: </strong>
              {' '}
              {stateObj.sendHouse}
            </div>
            <div>
              <strong className="bold"> Electoral Votes: </strong>
              {' '}
              {stateObj.sendVotes}
            </div>
            <div>
              <strong className="bold"> Link: </strong>
              <a href={stateObj.sendWeb} target="_blank" rel="noreferrer"> Government Website </a>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
      </>
    );
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
    <div>
    <section id="section-red"> <div className="slogan-white"> Explore the United States and learn about each state </div> </section>
    <div className="map">
      <div className="flex-container-map">
        <div className="box1"> </div>
        <div className="republic"> Republic </div>
        <div className="box2"> </div>
        <div className="democratic"> Democratic </div>
        <div className="box3"> </div>
        <div className="competitive"> Competitive </div>
      </div>
      <div className="data">
        {showStateData()}
      </div>
      <USAMap onClick={mapHandler} customize={statesCustomConfig()} />
    </div>
    </div>
  );
}

export default Map;
