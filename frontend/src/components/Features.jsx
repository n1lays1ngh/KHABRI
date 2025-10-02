import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const featureData = [
  {
    icon: 'bi-lightbulb',
    title: 'Smart Summarization',
    description: 'Advanced AI algorithms extract key information and present it in digestible summaries.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Trusted Sources',
    description: 'Only verified and credible news sources are used for generating summaries.',
  },
  {
    icon: 'bi-eye',
    title: 'Transparency',
    description: 'See original sources and understand how the summaries are created with full transparency.',
  },
  {
    icon: 'bi-lightning-charge-fill',
    title: 'Quick Access',
    description: 'Get summaries in seconds, not minutes. Perfect for busy professionals and students.',
  },
];

const Features = () => {
  return (
    <Container className="section-spacer">
      <h2 className="text-center fw-bold mb-5">Why Choose Khabri</h2>
      <Row>
        {featureData.map((feature, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card className="h-100 p-3" style={{ backgroundColor: '#16182C', border: '1px solid #2A2C49' }}>
              <Card.Body className="text-start">
                <div className="mb-3">
                  <i className={`${feature.icon} fs-2`} style={{ color: '#8966ff' }}></i>
                </div>
                <Card.Title className="fw-bold mb-2 text-white ">{feature.title}</Card.Title>
                <Card.Text className="text-white-50">{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;