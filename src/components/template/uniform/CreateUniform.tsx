import { HStack, Stack, Text } from '@chakra-ui/layout';
import { Document, useCollection } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { DatePicker } from 'components/datepicker';
import { UniformCardInfo, UserInfo } from 'models/users';
import React, { useState, VFC } from 'react';
import { FirebaseTimestamp } from 'utils/firebase';

type Props = {
  uniforms: Document<UniformCardInfo>[];
  userInfo: UserInfo;
};

const CreateUniform: VFC<Props> = ({ uniforms, userInfo }) => {
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
    <>
      {inputToggle ? (
        <Stack spacing={4} align="center">
          <Text fontSize="18px" fontWeight="bold">{`第${
            uniforms.length + 1
          }回ユニフォーム採寸`}</Text>
          <HStack>
            <Text fontWeight="bold">【期限】</Text>
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
          onClick={() => setInputToggle(true)}
        />
      )}
    </>
  );
};

export default CreateUniform;
