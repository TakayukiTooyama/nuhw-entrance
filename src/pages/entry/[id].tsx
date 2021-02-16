import { Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { EntryForm } from 'components/template';
import { NextPage } from 'next';
import React from 'react';

const EntryFormPage: NextPage = () => {
  return (
    <Layout
      title="エントリーフォーム"
      prevPageLink="/"
      prevPageTitle="大会一覧"
    >
      <Container maxW="xl" py={12}>
        <EntryForm />
      </Container>
    </Layout>
  );
};

export default EntryFormPage;
