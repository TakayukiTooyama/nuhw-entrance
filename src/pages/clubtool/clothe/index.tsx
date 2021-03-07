import { Container } from '@chakra-ui/react';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { NextPage } from 'next';
import React from 'react';

const linkData = [
  { label: '採寸', link: '/clubtool/measure' },
  { label: '確認', link: '/clubtool/measure/confirm' },
];

const ClothePage: NextPage = () => {
  return (
    <Layout title="ユニフォーム">
      <TopHeading title="ユニフォーム" linkData={linkData} />
      <Container maxW="xl" py={8}>
        {/* <MeasurementForm /> */}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default ClothePage;
