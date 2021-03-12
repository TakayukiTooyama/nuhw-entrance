import { Button, ButtonProps } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = ButtonProps & {
  label: string;
  isLoading?: boolean;
};

const FormButton: VFC<Props> = ({ label = '', isLoading, ...props }) => {
  return (
    <Button
      w="100%"
      type="submit"
      borderRadius="30px"
      shadow="base"
      isLoading={isLoading}
      {...props}
    >
      {label}
    </Button>
  );
};

export default FormButton;
