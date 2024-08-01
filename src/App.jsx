import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const saveQuote = () => {
    if (quote && !savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <h1>Ron Swanson Quotes</h1>
      <div className="quote-card">
        <p>{quote}</p>
        <button onClick={fetchQuote}>New Quote</button>
        <button onClick={saveQuote}>Save Quote</button>
      </div>
      <h2>Saved Quotes</h2>
      <div className="saved-quotes">
        {savedQuotes.map((savedQuote, index) => (
          <div key={index} className="saved-quote-card">
            <p>{savedQuote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;