import { Box, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout } from 'components/layout';
import { Spinner } from 'components/loading';
import { UniformManagementTableList } from 'components/template/uniform';
import { UniformInfo } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const UniformManagementDetail: NextPage = () => {
  const { data: orders, error: ordersError } = useCollection<UniformInfo>(
    'orders',
    {
      parseDates: ['addedAt'],
      isCollectionGroup: true,
    }
  );

  ordersError && console.error(ordersError);
  return (
    <Layout
      title="ユニフォーム注文詳細情報"
      prevPageLink="/uniform/management"
      prevPageTitle="ユニフォーム"
    >
      <Box py={8} px={[4, 4, 8]} align="center">
        {!orders && <Spinner />}
        {orders?.length > 0 && <UniformManagementTableList orders={orders} />}
        {(ordersError || orders?.length === 0) && (
          <Box>
            <Text mb={12}>まだ注文されていません。</Text>
            <Image
              width={300}
              height={250}
              src="/Images/no-data.png"
              alt="管理"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default UniformManagementDetail;
