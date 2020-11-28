import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import Socket from './Socket';

function SearchBar() {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSelect(e) {
    setText(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Socket.emit('send message', text);
    setText('');
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          className="search-bar"
          getItemValue={(item) => item.label}
          items={[
            { label: 'Ballot' },
            { label: 'Election' },
            { label: 'Voter' },
          ]}
          renderItem={(item, isHighlighted) => (
            <div style={{
              background: isHighlighted ? 'lightgray' : 'white',
              font: 'Roboto',
            }}
            >
              {item.label}
            </div>
          )}
          type={text}
          onChange={handleChange}
          onSelect={handleSelect}
          value={text}
          placeholder="Enter a political term..."
          required
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
