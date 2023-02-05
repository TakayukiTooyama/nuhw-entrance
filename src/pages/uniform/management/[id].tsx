import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Layout } from '@/components/layout';
import { Spinner } from '@/components/loading';
import { UniformManagementTableList } from '@/components/template/uniform';
import type { UniformInfo } from '@/models/users';

const UniformManagementDetail: NextPage = () => {
  const router = useRouter();
  const path = router.asPath.split('/')[3];

  const { data: orders, error: ordersError } = useCollection<UniformInfo>(
    'orders',
    {
      parseDates: ['addedAt'],
      isCollectionGroup: true,
    }
  );

  // 選択された回だけを表示
  const selectOrders = orders?.filter((order) => path === order.formId);

  ordersError && console.error(ordersError);
  return (
    <Layout
      title="ユニフォーム注文詳細情報"
      prevPageLink="/uniform/management"
      prevPageTitle="ユニフォーム"
    >
      <Container py={8} centerContent maxW="5xl">
        {!selectOrders && <Spinner />}
        {selectOrders?.length > 0 && (
          <UniformManagementTableList orders={selectOrders} />
        )}
        {(ordersError || selectOrders?.length === 0) && (
          <Box textAlign="center">
            <Text mb={12}>まだ注文されていません。</Text>
            <Image
              width={300}
              height={250}
              src="/Images/no-data.png"
              alt="管理"
            />
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default UniformManagementDetail;
