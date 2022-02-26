import { Box, List, Stack, Text } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import Image from 'next/image';
import type { VFC } from 'react';

import {
  CreateUniform,
  UniformManagementListItem,
} from '@/components/template/uniform';
import type { UniformCardInfo, UserInfo } from '@/models/users';
import { MotionBox } from '@/utils/motion';
import { listVariants } from '@/utils/variants';

type Props = {
  uniforms: Document<UniformCardInfo>[];
  userInfo: UserInfo;
};

export const UniformManagementList: VFC<Props> = ({ uniforms, userInfo }) => (
  <Stack spacing={6}>
    {uniforms.length !== 0 ? (
      <MotionBox
        as={List}
        variants={listVariants}
        initial="closed"
        animate="open"
      >
        {uniforms.map((data) => (
          <UniformManagementListItem
            key={data.id}
            data={data}
            userInfo={userInfo}
          />
        ))}
      </MotionBox>
    ) : (
      <Box align="center">
        <Text mb={8}>何も作成されていません。</Text>
        <Image
          width={350}
          height={250}
          src="/Images/walking.png"
          alt="ユニフォーム管理"
        />
      </Box>
    )}
    <CreateUniform uniforms={uniforms} userInfo={userInfo} />
  </Stack>
);
