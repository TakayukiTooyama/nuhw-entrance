import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = ButtonProps & {
  label: string;
};

export const BasicButton: VFC<Props> = ({ label = '', ...props }) => (
  <Button w="100%" borderRadius="30px" shadow="base" {...props}>
    {label}
  </Button>
);
