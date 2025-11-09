import React, { createContext, useState, useContext } from 'react';

// The URL for your FastAPI backend
const API_URL = 'http://localhost:8000'; // Or whatever port you run it on

// 1. Create the context
const NewsContext = createContext();

// 2. Create the provider (a component that "provides" the data)
export function NewsProvider({ children }) {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // This is the function we'll call to fetch news
  const fetchNews = async (topic) => {
    setIsLoading(true);
    setError(null);
    setResults(null); // Clear old results

    try {
      // Your FastAPI endpoint: GET /news?topic=...
      const response = await fetch(`${API_URL}/news?topic=${encodeURIComponent(topic)}`);
      
      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }
      
      const data = await response.json();
      setResults(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NewsContext.Provider value={{ results, isLoading, error, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
}

// 3. Create a custom hook for easy access
export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};