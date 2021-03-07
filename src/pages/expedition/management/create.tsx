import { Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { CreateVoteForm } from 'components/template/expedition';
import { NextPage } from 'next';
import React from 'react';

const EntryCreate: NextPage = () => {
  return (
    <Layout
      title="移動希望投票作成"
      prevPageTitle="投票管理"
      prevPageLink="/expedition/management"
    >
      <Container maxW="xl" py={8}>
        <CreateVoteForm />
      </Container>
    </Layout>
  );
};

export default EntryCreate;
