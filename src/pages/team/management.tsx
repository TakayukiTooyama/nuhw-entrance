import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { Layout, TabBar, TopHeading } from '@/components/layout';
import { Inheritance } from '@/components/template';

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
