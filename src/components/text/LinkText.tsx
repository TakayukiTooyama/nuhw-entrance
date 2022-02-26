import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';
import type { VFC } from 'react';

type Props = TextProps & {
  link: string;
  text: string;
};

export const LinkText: VFC<Props> = ({ link = '/', text = '', ...props }) => (
  <Link href={link} passHref>
    <Text
      onClick={() => Router.push(link)}
      color="gray"
      decoration="underline"
      {...props}
    >
      {text}
    </Text>
  </Link>
);
