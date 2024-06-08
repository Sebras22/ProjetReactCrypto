// src/pages/TopThreeHistory.tsx
import React from 'react';
import { Container, Title } from '@mantine/core';
import TopThreePriceChart from '../components/TopThreePriceChart';

const TopThreeHistory: React.FC = () => {
  return (
    <Container>
      <Title my="lg">Top 3 investissement</Title>
      <TopThreePriceChart />
    </Container>
  );
};

export default TopThreeHistory;
