import { List, ListItem, Stack, Text } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';

import { Spinner } from '@/components/loading';
import { UniformConfirmCard } from '@/components/template/uniform';
import type { UniformInfo } from '@/models/users';
import { MotionBox } from '@/utils/motion';
import { listItemVariants, listVariants } from '@/utils/variants';

type Props = {
  orders: Document<UniformInfo>[];
};

export const UniformConfirmList: VFC<Props> = ({ orders }) => (
  <Stack spacing={6}>
    <MotionBox
      as={List}
      spacing={6}
      variants={listVariants}
      initial="closed"
      animate="open"
    >
      {orders ? (
        <MotionBox as={ListItem} variants={listItemVariants}>
          <UniformConfirmCard data={orders[0]} />
        </MotionBox>
      ) : (
        <Spinner />
      )}
    </MotionBox>
    <Text textAlign="left" color="gray.400" px={4}>
      ※注文を変更したい場合は、一度削除し、再び注文してください(期限内なら可)。
    </Text>
  </Stack>
);
