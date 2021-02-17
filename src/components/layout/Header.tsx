import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Heading, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Drawer } from 'components/drawer';
import { useAuth } from 'context/Auth';
import Router from 'next/router';
import React, { useEffect, VFC } from 'react';

type Props = {
  prevPageLink?: string;
  prevPageTitle?: string;
};

const wrapper = {
  justify: 'space-between',
  align: 'center',
  px: 4,
  h: '50px',
};

const Header: VFC<Props> = ({ prevPageLink, prevPageTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  // userが明示的にnullの場合はサインイン画面へリダイレクト
  useEffect(() => {
    !user && Router.push('/signin');
  }, [user]);

  return (
    <>
      {prevPageLink ? (
        <Flex bg="white" {...wrapper}>
          <HStack spacing={4}>
            <ArrowBackIcon
              w={6}
              h={6}
              onClick={() => Router.push(prevPageLink)}
            />
            <Text>{prevPageTitle}</Text>
          </HStack>
        </Flex>
      ) : (
        <Flex bg="gray.200" {...wrapper}>
          <HStack spacing={4}>
            <HamburgerIcon w={6} h={6} cursor="pointer" onClick={onOpen} />
            <Heading
              as="h1"
              size="md"
              cursor="pointer"
              onClick={() => Router.push('/')}
            >
              ENTRANCE
            </Heading>
          </HStack>
          {/* 意見ボックスが来る */}
        </Flex>
      )}

      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
