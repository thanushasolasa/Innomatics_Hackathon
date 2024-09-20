import React from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className="App">
      <h1>Country Search</h1>
      <SearchBar /> {/* Display the search bar component */}
    </div>
  );
};

export default App;
