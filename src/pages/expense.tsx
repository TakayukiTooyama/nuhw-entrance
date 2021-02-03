import { Container, Text } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';
import React from 'react';

const Expense: NextPage = () => {
  return (
    <Layout title="集金">
      <Container>
        <Text>ここには集金の内容を作る</Text>
      </Container>
    </Layout>
  );
};

export default Expense;
