import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CTA = () => {
  return (
    <Container className="text-center section-spacer">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="fw-bold mb-3">Ready to Transform Your News Experience?</h2>
          <p className="text-white-50 mb-4">
            Join thousands of users who trust Khabri for their daily news summaries.
          </p>
          <Button variant="primary" size="lg" className="btn-custom">
            Get Started Free
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CTA;

