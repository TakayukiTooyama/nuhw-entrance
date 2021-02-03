import { Container, Text } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';
import React from 'react';

const Profile: NextPage = () => {
  return (
    <Layout title="プロフィール">
      <Container>
        <Text>ここはプロフィール画面を作る</Text>
      </Container>
    </Layout>
  );
};

export default Profile;
