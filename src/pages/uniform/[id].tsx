import { Container } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout } from 'components/layout';
import {
  FemaleUniformForm,
  MaleUniformForm,
} from 'components/template/uniform';
import { useAuth } from 'context/Auth';
import { UniformCardInfo, User } from 'models/users';
import { NextPage } from 'next';
import React from 'react';

const UniformFormPage: NextPage = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);
  const { data: uniforms, error: uniformsError } =
    useCollection<UniformCardInfo>(`teams/${userInfo?.teamId}/uniforms`, {
      parseDates: ['timeLimit', 'cretatedAt'],
      orderBy: ['createdAt', 'desc'],
      limit: 1,
    });

  uniformsError && console.error(uniformsError);
  return (
    <Layout
      title="採寸フォーム"
      prevPageLink="/uniform"
      prevPageTitle="ユニフォーム"
    >
      <Container maxW="xl" py={8}>
        {uniforms?.length > 0 &&
          (userInfo.gender === '男' ? (
            <MaleUniformForm
              id={uniforms[0].id}
              title={uniforms[0].name}
              userInfo={userInfo}
            />
          ) : (
            <FemaleUniformForm
              id={uniforms[0].id}
              title={uniforms[0].name}
              userInfo={userInfo}
            />
          ))}
      </Container>
    </Layout>
  );
};

export default UniformFormPage;
