import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { Layout } from '@/components/layout';
import { EntryForm } from '@/components/template';

const EntryFormPage: NextPage = () => (
  <Layout title="エントリーフォーム" prevPageLink="/" prevPageTitle="大会一覧">
    <Container maxW="xl" py={8}>
      <EntryForm />
    </Container>
  </Layout>
);

export default EntryFormPage;
