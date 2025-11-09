import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom" 
import { useNews } from '../context/NewsContext'
import { Newspaper } from 'react-bootstrap-icons'

// 1. Import the new SourceCard component
import SourceCard from '../components/SourceCard'

// --- UPDATED HELPER FUNCTION ---
// This function parses the summary string into list items
const renderSummaryPoints = (summary) => {
  if (!summary) return null;

  const points = summary
    .split('\n') // Split by newline
    .filter(line => line.trim() !== '') // Remove empty lines
    .map(line => line.replace('•', '').trim()); // Remove bullet and trim

  return (
    <ul className="summary-list">
      {points.map((point, index) => {
        // Find the first colon (:)
        const colonIndex = point.indexOf(':');
        
        // If we find a colon and it's not at the very end
        if (colonIndex > 0 && colonIndex < point.length - 1) {
          const keyword = point.substring(0, colonIndex + 1);
          const text = point.substring(colonIndex + 1);
          return (
            <li key={index}>
              <strong>{keyword}</strong>
              <span>{text}</span>
            </li>
          );
        }
        
        // If no colon, just render the point
        return <li key={index}>{point}</li>;
      })}
    </ul>
  );
};


function ResultsPage() {
  const { results, isLoading, error, fetchNews } = useNews();
  const [topic, setTopic] = useState('');

  useEffect(() => {
    if (results?.topic) {
      setTopic(results.topic);
    }
  }, [results]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    fetchNews(topic);
  };

  // --- Loading Block (no change) ---
  if (isLoading) {
    return (
      <div 
        className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" 
        style={{ minHeight: '60vh' }}
      >
        <Newspaper style={{ color: 'var(--color-primary)', fontSize: '4rem' }} />
        <div 
          className="spinner-border text-primary my-3" 
          role="status" 
          style={{width: '2.5rem', height: '2.5rem'}}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-2 text-white">
          Fetching you the latest news...
        </h3>
        <p className="fs-5" style={{ color: 'var(--color-placeholder)' }}>
          Please wait while we analyze the sources.
        </p>
      </div>
    );
  }

  // --- Error Block (no change) ---
  if (error) {
    return (
      <div 
        className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" 
        style={{ minHeight: '60vh' }}
      >
        <h3 className="text-danger">Error: {error}</h3>
        <p className="fs-5" style={{ color: 'var(--color-placeholder)' }}>
          We couldn't fetch the summary. Please try again.
        </p>
        <Link to="/" className="btn btn-primary mt-3">Try Again</Link>
      </div>
    );
  }

  // --- No Results Block (no change) ---
  if (!results) {
    return (
      <div 
        className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" 
        style={{ minHeight: '60vh' }}
      >
        <h3 className="text-white">No results found.</h3>
        <p className="fs-5" style={{ color: 'var(--color-placeholder)' }}>
          Please search for a topic from the home page.
        </p> 
        <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
      </div>
    );
  }

  // --- Main Results Render ---
  return (
    <div className="container py-5">
      
      {/* --- Top Search Bar (no change) --- */}
      <div className="row mb-5">
        <div className="col-lg-8 offset-lg-2">
          <form className="input-group input-group-lg search-bar-results" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search for news, topics, or keywords..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              {isLoading ? '...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      <div className="row g-4">
        {/* --- Main Content Area --- */}
        <div className="col-lg-10 offset-lg-1">
          
          {/* AI Summary Card */}
          <div className="summary-card mb-4">
            {/* Added the header class from the original design */}
            <div className="summary-card-header">
              <h3 className="text-white mb-0">Unbiased News</h3>
            </div>
            
            {/* This div provides padding AND NOW SCROLLING */}
            <div className="p-4 summary-content-scroll"> {/* <-- CLASS ADDED HERE */}
              {/* Call the updated render function */}
              {renderSummaryPoints(results.summary)}
              
              <hr style={{ borderColor: 'var(--color-border)' }} />
              <p className="text-secondary mb-0">
                Generated from {results.articles.length} sources
              </p> {/* <-- TYPO FIX: </D> changed to </p> --> */}
            </div>
          </div>

          {/* Sources Section */}
          <h3 className="text-white mb-4">Sources</h3>
          <div className="row g-3">
            {/* 3. Use the new SourceCard component in the loop */}
            {results.articles.map((article, index) => (
              <div className="col-md-6" key={index}>
                <SourceCard article={article} index={index} />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ResultsPage