import { Box, HStack, List, Stack, Text } from '@chakra-ui/react';
import { Document, useCollection } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import BasicButton from 'components/button/BasicButton';
import { DatePicker } from 'components/datepicker';
import { UniformManagementListItem } from 'components/template/uniform';
import { UniformCardInfo, UserInfo } from 'models/users';
import Image from 'next/image';
import React, { useState, VFC } from 'react';
import { FirebaseTimestamp } from 'utils/firebase';
import { MotionBox } from 'utils/motion';
import { listVariants } from 'utils/variants';

type Props = {
  uniforms: Document<UniformCardInfo>[];
  userInfo: UserInfo;
};

const UniformManagementList: VFC<Props> = ({ uniforms, userInfo }) => {
  const [inputToggle, setInputToggle] = useState(false);
  const [timeLimit, setTimeLimit] = useState(new Date());

  const { add } = useCollection<UniformCardInfo>(
    `teams/${userInfo?.teamId}/uniforms`
  );

  const addUniformCard = () => {
    add({
      name: `第${uniforms.length + 1}回ユニフォーム採寸`,
      timeLimit,
      createdAt: FirebaseTimestamp.now(),
    }).then(() => {
      setInputToggle(false);
    });
  };

  return (
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
        <Box textAlign="center">
          <Text fontSize={['16px', '18px', '20px']} mb={8}>
            何も作成されていません。
          </Text>
          <Image width={400} height={300} src="/Images/walking.png" />
        </Box>
      )}
      {inputToggle ? (
        <Stack spacing={4} align="center">
          <Text fontSize="18px" fontWeight="bold">{`第${
            uniforms.length + 1
          }回ユニフォーム採寸`}</Text>
          <HStack>
            <Text fontWeight="bold">【期限】</Text>
            <DatePicker
              selected={timeLimit}
              onChange={(date: any) => setTimeLimit(date)}
            />
          </HStack>
          <BasicButton
            label="作成"
            colorScheme="teal"
            onClick={addUniformCard}
          />
        </Stack>
      ) : (
        <Button
          label="新しく作成する"
          colorScheme="teal"
          onClick={() => setInputToggle(true)}
        />
      )}
    </Stack>
  );
};

export default UniformManagementList;
