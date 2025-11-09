import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-5 py-5" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h4 className="text-white">Khabri</h4>
            <p>AI-powered news summarization</p>
          </div>
          <div className="col-lg-8 d-flex justify-content-lg-end">
            <div className="row">
              
            </div>
          </div>
        </div>
        <hr style={{ borderColor: 'var(--color-border)' }} />
        <div className="text-center text-md-start">
          <p className="mb-0">© {new Date().getFullYear()} Khabri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer