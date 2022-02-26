import { HStack, Stack, Text } from '@chakra-ui/layout';
import type { Document } from '@nandorojo/swr-firestore';
import { useCollection } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';
import { useState } from 'react';

import { Button } from '@/components/button';
import { DatePicker } from '@/components/datepicker';
import type { UniformCardInfo, UserInfo } from '@/models/users';
import { FirebaseTimestamp } from '@/utils/firebase';

type Props = {
  uniforms: Document<UniformCardInfo>[];
  userInfo: UserInfo;
};

export const CreateUniform: VFC<Props> = ({ uniforms, userInfo }) => {
  const [isInputToggle, setIsInputToggle] = useState(false);
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
      setIsInputToggle(false);
    });
  };

  return (
    <>
      {isInputToggle ? (
        <Stack spacing={4} align="center">
          <Text fontSize="18px" fontWeight="bold">{`第${
            uniforms.length + 1
          }回ユニフォーム採寸`}</Text>
          <HStack>
            <Text fontWeight="bold" width={'100%'}>
              【期限】
            </Text>
            <DatePicker
              selected={timeLimit}
              showTimeSelect
              onChange={(date: any) => setTimeLimit(date)}
            />
          </HStack>
          <Button label="作成" colorScheme="teal" onClick={addUniformCard} />
        </Stack>
      ) : (
        <Button
          label="新しく作成する"
          colorScheme="teal"
          onClick={() => setIsInputToggle(true)}
        />
      )}
    </>
  );
};
