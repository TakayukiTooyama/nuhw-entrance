import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  title?: string;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<undefined>;
  onClose: () => void;
  onDelete: () => Promise<void>;
};

const DeleteDialog: FC<Props> = ({
  title = 'エントリー',
  isOpen,
  cancelRef,
  onClose,
  onDelete,
  children,
}) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent w="95%" maxW="lg" p={4}>
        <AlertDialogHeader textAlign="center">{title}削除</AlertDialogHeader>
        <AlertDialogBody>{children}</AlertDialogBody>
        <AlertDialogFooter w="100%">
          <Button
            w="100%"
            shadow="base"
            borderRadius="30px"
            onClick={onClose}
            mr={4}
          >
            キャンセル
          </Button>
          <Button
            w="100%"
            borderRadius="30px"
            shadow="base"
            colorScheme="red"
            onClick={onDelete}
          >
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
