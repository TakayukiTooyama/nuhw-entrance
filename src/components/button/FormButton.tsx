import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = ButtonProps & {
  label: string;
  isLoading?: boolean;
};

export const FormButton: VFC<Props> = ({ label = '', isLoading, ...props }) => (
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
