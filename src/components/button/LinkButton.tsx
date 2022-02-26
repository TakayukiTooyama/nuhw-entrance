import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import type { VFC } from 'react';

type Props = ButtonProps & {
  label: string;
  link: string;
  currentPage?: boolean;
};

export const LinkButton: VFC<Props> = ({
  label = '',
  link = '',
  currentPage = false,
  ...props
}) => (
  <Link href={link} passHref>
    <Button
      w="100%"
      shadow="base"
      colorScheme={currentPage ? 'teal' : 'gray'}
      {...props}
    >
      {label}
    </Button>
  </Link>
);
