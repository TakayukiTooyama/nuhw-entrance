import { Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';
import React from 'react';

const movement: NextPage = () => {
  return (
    <Layout title="移動方法">
      <Container>ここはバスの希望投票を作る</Container>
    </Layout>
  );
};

export default movement;
