import { Text, TextProps } from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';
import React, { VFC } from 'react';

type Props = TextProps & {
  link: string;
  text: string;
};

const LinkText: VFC<Props> = ({ link = '/', text = '', ...props }) => {
  return (
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
};

export default LinkText;
