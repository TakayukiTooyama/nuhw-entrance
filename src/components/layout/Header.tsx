import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Drawer } from 'components/drawer';
import Router from 'next/router';
import React, { VFC } from 'react';

type Props = {
  prevPageLink?: string;
  prevPageTitle?: string;
};

const Header: VFC<Props> = ({ prevPageLink, prevPageTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justify="space-between" align="center" px={4} h="50px" bg="white">
        {/* 作成画面や詳細画面に遷移したときヘッダーを変更する */}
        {prevPageLink ? (
          <HStack>
            <ArrowBackIcon
              w={6}
              h={6}
              onClick={() => Router.push(prevPageLink)}
            />
            <Text>{prevPageTitle}</Text>
          </HStack>
        ) : (
          <HamburgerIcon w={6} h={6} cursor="pointer" onClick={onOpen} />
        )}

        {/* 意見ボックスが来る */}
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
