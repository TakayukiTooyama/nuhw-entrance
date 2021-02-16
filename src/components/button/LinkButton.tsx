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
      shadow="base"
      bg={currentPage ? 'orange.400' : 'white'}
      w="100%"
      {...props}
    >
      {label}
    </Button>
  </Link>
);

export default LinkButton;
