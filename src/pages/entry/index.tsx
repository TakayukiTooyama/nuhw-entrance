import { Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';
import React from 'react';

const Entry: NextPage = () => {
  return (
    <Layout title="エントリー">
      <Container>ここはエントリーリストを作る</Container>
    </Layout>
  );
};

export default Entry;
