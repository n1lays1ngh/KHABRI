import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

const Hero = () => {
  return (
    <Container className="text-center section-spacer" style={{ paddingTop: '100px' }}>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="display-4 fw-bold mb-3">Your Personal AI for News Summaries</h1>
          <p className="lead text-white-50 mb-5">
            Get instant, reliable summaries with verified sources. Stay informed without the information overload.
          </p>
          <Form>
            <InputGroup size="lg" className="mb-3 mx-auto" style={{ maxWidth: '800px' }}>
              <Form.Control
                placeholder="Enter news topic or URL..."
                aria-label="Enter news topic or URL"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
              />
              <Button variant="primary" className="btn-custom">
                Summarize
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;

