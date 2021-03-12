import { Container } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { UniformManagementList } from 'components/template/uniform';
import { useAuth } from 'context/Auth';
import { UniformCardInfo, User } from 'models/users';
import { NextPage } from 'next';
import React from 'react';

const linkData = [
  { label: '採寸', link: '/uniform' },
  { label: '確認', link: '/uniform/confirm' },
];

const UniformManagementPage: NextPage = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);
  const {
    data: uniforms,
    error: uniformsError,
  } = useCollection<UniformCardInfo>(`teams/${userInfo?.teamId}/uniforms`, {
    orderBy: ['createdAt', 'desc'],
    parseDates: ['createdAt', 'timeLimit'],
    listen: true,
  });

  uniformsError && console.error(uniformsError);
  return (
    <Layout title="ユニフォーム">
      <TopHeading
        title="ユニフォーム"
        linkData={linkData}
        adminLink="/uniform/management"
      />
      <Container maxW="xl" py={8}>
        {uniforms ? (
          <UniformManagementList uniforms={uniforms} userInfo={userInfo} />
        ) : (
          <Spinner />
        )}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default UniformManagementPage;
