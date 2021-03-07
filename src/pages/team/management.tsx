import { Container } from '@chakra-ui/react';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Inheritance } from 'components/template';
import { NextPage } from 'next';
import React from 'react';

const TeamManagement: NextPage = () => (
  <Layout title="引き継ぎ">
    <TopHeading title="引き継ぎ" />
    <Container maxW="lg" py={8}>
      <Inheritance />
    </Container>
    <TabBar />
  </Layout>
);

export default TeamManagement;
