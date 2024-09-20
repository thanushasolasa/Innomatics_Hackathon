import React, { useState } from 'react';
import countriesData from './countries.json'; // Assuming you have the JSON file here

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountryDetails, setSelectedCountryDetails] = useState(null);

  // Filter countries based on search query (country name only)
  const handleSearch = (input) => {
    setQuery(input);
    if (input.trim() !== '') {
      const filtered = countriesData.filter((country) => {
        const countryName = country.country ? country.country.toLowerCase() : '';
        return countryName.includes(input.toLowerCase());
      });
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  // Handle selection of a country from the suggestions
  const handleSelect = (selectedCountry) => {
    setQuery(selectedCountry.country); // Set the search bar to display the selected country's name
    setFilteredCountries([]);
    setSelectedCountryDetails(selectedCountry); // Set the selected country's details
  };

  // Clear the search bar on focus
  const handleFocus = () => {
    setQuery(''); // Clear the input when focusing the search bar again
    setFilteredCountries([]); // Hide suggestions when search bar is cleared
  };

  return (
    <div className="search-bar-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by country..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus} // Clear the search bar when focused
          className="search-input"
        />
        {/* Autocomplete Suggestions */}
        {filteredCountries.length > 0 && (
          <ul className="suggestions">
            {filteredCountries.map((country) => (
              <li
                key={country.country}
                onClick={() => handleSelect(country)}
                className="suggestion-item"
              >
                {country.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display the selected country details in a card */}
      {selectedCountryDetails && (
        <div className="country-details">
          <h2>{selectedCountryDetails.country}</h2>
          <p><strong>Capital:</strong> {selectedCountryDetails.capital || 'No Capital'}</p>
          <p><strong>Population:</strong> {selectedCountryDetails.population || 'Unknown'}</p>
          <p><strong>Official Languages:</strong> 
            {Array.isArray(selectedCountryDetails.official_language)
              ? selectedCountryDetails.official_language.join(', ') // If it's an array, join the languages with commas
              : selectedCountryDetails.official_language || 'Unknown'} {/* Otherwise, show as is */}
          </p>
          <p><strong>Currency:</strong> {selectedCountryDetails.currency || 'Unknown'}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
