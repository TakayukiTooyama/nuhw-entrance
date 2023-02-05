import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Layout, TabBar, TopHeading } from '@/components/layout';
import { Spinner } from '@/components/loading';
import { UniformConfirmList } from '@/components/template/uniform';
import { useAuth } from '@/context/Auth';
import type { UniformInfo } from '@/models/users';

const linkData = [
  { label: '採寸', link: '/uniform' },
  { label: '確認', link: '/uniform/confirm' },
];

const UniformConfirm: NextPage = () => {
  const { user } = useAuth();

  const { data: orders, error: ordersError } = useCollection<UniformInfo>(
    `users/${user?.uid}/orders`,
    {
      parseDates: ['addedAt'],
      listen: true,
    }
  );

  ordersError && console.error(ordersError);
  return (
    <Layout title="発注確認">
      <TopHeading
        title="発注確認"
        linkData={linkData}
        adminLink="/uniform/management"
      />
      <Container maxW="xl" py={8} centerContent>
        {!orders && <Spinner />}
        {orders?.length > 0 && <UniformConfirmList orders={orders} />}
        {orders?.length === 0 && (
          <Box textAlign="center">
            <Text mb={8}>まだ注文がありません。</Text>
            <Image
              width={350}
              height={250}
              src="/Images/order.png"
              alt="発注"
            />
          </Box>
        )}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default UniformConfirm;
