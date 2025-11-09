import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LightningFill, ShieldCheck, Search, CardText } from 'react-bootstrap-icons'

// 1. Import the useNews hook
import { useNews } from '../context/NewsContext'

function LandingPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState(''); // State to hold form input
  
  // 2. Get what we need from the context
  const { fetchNews, isLoading } = useNews();

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return; // Don't search for empty string

    // 3. Call the API
    navigate('/results');
    fetchNews(topic);
    
    // 4. Navigate to the results page AFTER fetch is done
    
  };

  return (
    <div className="container">
      {/* --- Hero Section --- */}
      <section className="text-center py-5 my-5">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-3 fw-bold mb-4">
            Your Personal AI for News Summaries
          </h1>
          <p className="fs-5 text-secondary mb-4">
            Get instant, reliable summaries with verified sources. Stay informed without the information overload.
          </p>
          <form 
            className="input-group input-group-lg shadow-lg" 
            style={{ maxWidth: '600px', margin: '0 auto' }}
            onSubmit={handleSummarize} // Use the new handler
          >
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter news topic or URL..." 
              aria-label="Enter news topic or URL..."
              value={topic} // Controlled input
              onChange={(e) => setTopic(e.target.value)} // Update state on change
              disabled={isLoading} // Disable while loading
            />
            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={isLoading} // Disable while loading
            >
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </button>
          </form>
        </div>
      </section>

      {/* --- Features Section (remains the same) --- */}
      <section className="py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Why Choose Khabri</h2>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <div className="feature-icon"><CardText /></div>
              <h4 className="text-white mb-3">Smart Summarization</h4>
              <p>Advanced AI algorithms extract key information and present it in digestible summaries.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck /></div>
              <h4 className="text-white mb-3">Trusted Sources</h4>
              <p>Only verified and credible news sources are used for generating summaries.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <div className="feature-icon"><Search /></div>
              <h4 className="text-white mb-3">Transparency</h4>
              <p>See original sources and understand how the summaries are created with full transparency.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <div className="feature-icon"><LightningFill /></div>
              <h4 className="text-white mb-3">Quick Access</h4>
              <p>Get summaries in seconds, not minutes. Perfect for busy professionals and students.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section (remains the same) --- */}
      <section className="py-5 my-5 text-center">
        <div 
          className="py-5 rounded-3" 
          style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
        >
          <div className="col-lg-8 mx-auto">
            <h2 className="display-5 fw-bold mb-4">Ready to Transform Your News Experience?</h2>
            <p className="fs-5 text-secondary mb-4">
              Join thousands of users who trust Khabri for their daily news summaries.
            </p>
            <Link to="/results" className="btn btn-primary btn-lg">Get Started Free</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage