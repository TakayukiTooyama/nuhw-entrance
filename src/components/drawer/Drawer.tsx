import {
  Drawer,
  DrawerBody,
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
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent
          borderRadius="10px"
          maxW={['220px', '220px', '300px']}
          m={2}
        >
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
