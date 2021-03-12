import { Container, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { UniformTimeLimitCard } from 'components/card';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { useAuth } from 'context/Auth';
import { UniformCardInfo, UniformInfo, User } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants } from 'utils/variants';

const linkData = [
  { label: '採寸', link: '/uniform' },
  { label: '確認', link: '/uniform/confirm' },
];

const UniformPage: NextPage = () => {
  const { user } = useAuth();
  const { data: uniform, error: uniformError } = useCollection<UniformInfo>(
    `users/${user?.uid}/orders`
  );
  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);
  const {
    data: uniforms,
    error: uniformsError,
  } = useCollection<UniformCardInfo>(`teams/${userInfo?.teamId}/uniforms`, {
    parseDates: ['timeLimit', 'createdAt'],
  });

  // 期限内のユニフォーム採寸
  const filteredUniforms = uniforms?.filter(
    (data) => data.timeLimit > new Date()
  );

  uniformsError && console.error(uniformsError);
  uniformError && console.error(uniformError);
  return (
    <Layout title="ユニフォーム">
      <TopHeading
        title="ユニフォーム"
        linkData={linkData}
        adminLink="/uniform/management"
      />
      <Container maxW="xl" py={8}>
        {uniform && uniform.length > 0 ? (
          <Stack align="center">
            <Text textAlign="center" mb={4}>
              すでに採寸は完了しています。
              <br />
              ご協力ありがとうございました。
            </Text>
            <Image width={400} height={300} src="/Images/present.png" />
          </Stack>
        ) : (
          <>
            {!filteredUniforms && <Spinner />}
            {filteredUniforms && filteredUniforms.length > 0 ? (
              <MotionBox
                variants={listItemVariants}
                initial="closed"
                animate="open"
              >
                <UniformTimeLimitCard
                  text={filteredUniforms[0].name}
                  data={filteredUniforms[0]}
                  link={`/uniform/${filteredUniforms[0].id}`}
                />
              </MotionBox>
            ) : (
              <Stack align="center">
                <Text mb={8}>現在採寸は行われていません。</Text>
                <Image width={400} height={300} src="/Images/walking.png" />
              </Stack>
            )}
          </>
        )}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default UniformPage;
