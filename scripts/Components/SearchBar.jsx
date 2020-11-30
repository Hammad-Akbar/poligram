import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Socket from './Socket';

function SearchBar() {
  const [text, setText] = useState('');

  const items = [
    { label: 'Ballot' },
    { label: 'Election' },
    { label: 'Voter' },
    { label: 'Campaign' },
    { label: 'Convention' },
    { label: 'Lobby' },
    { label: 'Muckraker' },
    { label: 'Nominee' },
    { label: 'Nomination' },
  ];

  function handleChange(e) {
    setText(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    Socket.emit('send message', text);
    setText('');
  }
  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="input-form">
        <Autocomplete
          onSubmit={handleSubmit}
          onInputChange={(event, newInputVal) => {
            setText(newInputVal);
          }}
          freeSolo
          options={items.map((option) => option.label)}
          className="search-bar"
          renderInput={(params) => (
            <TextField
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...params}
              autoFocus
              onChange={handleChange}
              value={text}
              required
              placeholder="Enter a political term..."
              margin="normal"
              variant="outlined"
            />
          )}
        />
        <button className="button-form" type="submit"> Search </button>
      </form>
    </div>
  );
}

export default SearchBar;
