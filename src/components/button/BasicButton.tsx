import { Button, ButtonProps } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = ButtonProps & {
  label: string;
};

const BasicButton: VFC<Props> = ({ label = '', ...props }) => {
  return (
    <Button w="100%" borderRadius="30px" shadow="base" {...props}>
      {label}
    </Button>
  );
};

export default BasicButton;
