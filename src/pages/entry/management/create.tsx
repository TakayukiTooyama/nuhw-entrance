import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { Layout } from '@/components/layout';
import { CreateEntryForm } from '@/components/template';

const EntryCreate: NextPage = () => (
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

export default EntryCreate;
