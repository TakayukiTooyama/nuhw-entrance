import { Text } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';
import React from 'react';

const Contact: NextPage = () => {
  return (
    <Layout title="お問い合わせ">
      <Text>ここはお問い合わせページを作る</Text>
    </Layout>
  );
};

export default Contact;
