import { Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { VoteForm } from 'components/template/expedition';
import { NextPage } from 'next';
import React from 'react';

const VoteFormPage: NextPage = () => {
  return (
    <Layout
      title="投票"
      prevPageLink="/expedition"
      prevPageTitle="移動希望投票"
    >
      <Container maxW="xl" py={12}>
        <VoteForm />
      </Container>
    </Layout>
  );
};

export default VoteFormPage;
