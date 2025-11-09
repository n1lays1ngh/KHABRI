import React, { useState } from 'react';
import { ChevronDown, InfoCircleFill } from 'react-bootstrap-icons';

// Helper component to show bias score
const BiasBadge = ({ score }) => {
  let colorClass = 'bg-secondary';
  let text = 'Unknown';
  if (score === 1) {
    colorClass = 'bg-success';
    text = 'Neutral';
  } else if (score === 2) {
    colorClass = 'bg-warning text-dark';
    text = 'Slight Bias';
  } else if (score >= 3) {
    colorClass = 'bg-danger';
    text = 'High Bias';
  }
  return <span className={`badge ${colorClass} ms-2`}>{text}</span>;
};

// Helper function to get domain from URL
const getDomainFromUrl = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch (e) {
    return 'unknown.com';
  }
};

const iconBgColors = [
  'var(--color-primary)', 
  '#34d399', // green
  '#fbbf24', // yellow
  '#f87171', // red
  '#60a5fa', // blue
];

// The new SourceCard component
function SourceCard({ article, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const domain = getDomainFromUrl(article.url);
  
  return (
    <div className="source-card h-100">
      <div className="d-flex align-items-center">
        <div 
          className="flex-shrink-0 d-flex source-icon align-items-center justify-content-center me-3" 
          style={{ backgroundColor: iconBgColors[index % iconBgColors.length] }}
        >
          {domain.charAt(0).toUpperCase()}
        </div>
        <div className="flex-grow-1">
          <h6 className="text-white mb-1">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-white">
              {article.title}
            </a>
          </h6>
          <p className="text-secondary mb-0 small">
            {domain}
          </p> 
        </div>
      </div>
      <div className="mt-2 d-flex justify-content-between align-items-center">
        <span className="text-secondary">
          <InfoCircleFill className="me-1" size={12} />
          Bias: <BiasBadge score={article.bias_score} />
        </span>
        
        {/* This is the new dropdown toggle button */}
        <button 
          className={`btn btn-link btn-sm text-secondary p-0 reason-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Hide reasoning" : "Show reasoning"}
        >
          Reasoning
          <ChevronDown className="ms-1" size={12} />
        </button>
      </div>

      {/* This div conditionally renders the reasoning */}
      <div className={`bias-reasoning ${isOpen ? 'open' : ''}`}>
        <hr style={{ borderColor: 'var(--color-border)' }} />
        <p className="text-secondary small mb-0">
          {article.bias_reasoning}
        </p>
      </div>
    </div>
  );
}

export default SourceCard;