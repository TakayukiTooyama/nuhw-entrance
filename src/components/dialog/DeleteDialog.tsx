import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  name: string;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<undefined>;
  onClose: () => void;
  onDelete: () => Promise<void>;
};

const DeleteDialog: VFC<Props> = ({
  name,
  isOpen,
  cancelRef,
  onClose,
  onDelete,
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
      <AlertDialogContent>
        <AlertDialogHeader>削除してもよろしいですか？</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody color="gray.400">
          <Text>{name}のエントリーは削除されます。</Text>
          <Text>期限内の大会であれば再びエントリーすることができます。</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button shadow="base" ref={cancelRef} onClick={onClose} mr={4}>
            キャンセル
          </Button>
          <Button shadow="base" colorScheme="red" onClick={onDelete}>
            削除
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
