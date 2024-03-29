import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
} from '@chakra-ui/react';
import type { FC } from 'react';

type Props = {
  title: string;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<undefined>;
  onClose: () => void;
  onClick: () => void;
};

export const ConfirmDialog: FC<Props> = ({
  title,
  isOpen,
  cancelRef,
  onClose,
  onClick,
  children,
}) => (
  <AlertDialog
    motionPreset="slideInBottom"
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
  >
    <AlertDialogOverlay />
    <AlertDialogContent w="95%" maxW="md" py={4}>
      <AlertDialogHeader textAlign="center" pb={1}>
        {title}確認
      </AlertDialogHeader>
      <Divider maxW="50px" mx="auto" mb={4} />
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
          colorScheme="teal"
          onClick={onClick}
        >
          OK
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
