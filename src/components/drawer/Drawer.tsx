import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { DrawerBodyItemList } from 'components/drawer';
import React, { VFC } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const BasicDrawer: VFC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      isCentered
      motionPreset="scale"
    >
      <DrawerOverlay>
        <DrawerContent borderRadius="10px" maxW="280px" m={2}>
          <DrawerCloseButton />
          <DrawerHeader>ENTRANCE</DrawerHeader>
          <DrawerBody>
            <DrawerBodyItemList />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default BasicDrawer;
