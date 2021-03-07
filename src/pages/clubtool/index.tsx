import { Container } from '@chakra-ui/react';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { ClubToolList } from 'components/template/clugTool';
import { NextPage } from 'next';
import React from 'react';

const ClubToolPage: NextPage = () => {
  return (
    <Layout title="部活道具管理">
      <TopHeading title="用具管理" />
      <Container maxW="xl" py={8}>
        <ClubToolList />
      </Container>
      <TabBar />
    </Layout>
  );
};

export default ClubToolPage;
