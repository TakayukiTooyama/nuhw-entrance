import { Button, ButtonProps } from '@chakra-ui/react';
import Link from 'next/link';
import React, { VFC } from 'react';

type Props = ButtonProps & {
  label: string;
  link: string;
  currentPage?: boolean;
};

const LinkButton: VFC<Props> = ({
  label = '',
  link = '',
  currentPage = false,
  ...props
}) => (
  <Link href={link} passHref>
    <Button
      w="100%"
      shadow="base"
      colorScheme={currentPage ? 'orange' : 'gray'}
      {...props}
    >
      {label}
    </Button>
  </Link>
);

export default LinkButton;
