import { Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';
import React from 'react';

const Profile: NextPage = () => {
  return (
    <Layout title="プロフィール">
      <Container align="center"></Container>
    </Layout>
  );
};

export default Profile;
