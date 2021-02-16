import { HStack, Input, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  carName: string;
  setCarName: React.Dispatch<React.SetStateAction<string>>;
};

const CreateCarInfo: VFC<Props> = ({ carName, setCarName }) => {
  return (
    <HStack justify="center">
      <Input
        maxW="200px"
        placeholder="〇〇先生"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
      />
      <Text w="40px">の車</Text>
    </HStack>
  );
};

export default CreateCarInfo;
