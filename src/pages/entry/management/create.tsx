import { Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { CreateEntryForm } from 'components/template';
import { NextPage } from 'next';
import React from 'react';

const EntryCreate: NextPage = () => {
  return (
    <Layout
      title="エントリーフォーム作成"
      prevPageTitle="エントリー管理"
      prevPageLink="/entry/management"
    >
      <Container maxW="xl" py={8}>
        <CreateEntryForm />
      </Container>
    </Layout>
  );
};

export default EntryCreate;
