import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5">
      <Container>
        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}/>
        <Row className="py-4 align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">Khabri</h5>
            <p className="text-white-50 small mb-0">AI-powered news summarization</p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link href="#privacy" className="text-white-50">Privacy Policy</Nav.Link>
              <Nav.Link href="#terms" className="text-white-50">Terms of Service</Nav.Link>
              <Nav.Link href="#support" className="text-white-50">Support</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <div className="text-center text-white-50 small pb-4">
          © 2024 Khabri. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

