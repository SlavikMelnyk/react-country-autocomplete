import React from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Select your country:</h1>
        <Autocomplete />
      </div>
    );
  }
}

export default App;
