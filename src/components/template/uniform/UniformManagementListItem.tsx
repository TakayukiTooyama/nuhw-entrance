import { useDisclosure } from '@chakra-ui/hooks';
import { ListItem } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { UniformTimeLimitCard } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { UniformCardInfo, UserInfo } from 'models/users';
import React, { useRef, VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants } from 'utils/variants';

type Props = {
  data: Document<UniformCardInfo>;
  userInfo: UserInfo;
};

const UniformListItem: VFC<Props> = ({ data, userInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const uniformsDelete = async () => {
    await fuego.db
      .doc(`/teams/${userInfo?.teamId}/uniforms/${data.id}`)
      .delete()
      .then(() => {
        onClose();
        toast({
          title: '成功',
          description: '削除に成功しました。',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <MotionBox as={ListItem} key={data.id} mb={4} variants={listItemVariants}>
      <UniformTimeLimitCard
        data={data}
        text={data.name}
        link={`/uniform/management/${data.id}`}
        onOpen={onOpen}
      />
      <DeleteDialog
        title="データの"
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onDelete={uniformsDelete}
      >
        {`${data.name}結果を完全に削除してもよろしいですか？`}
      </DeleteDialog>
    </MotionBox>
  );
};

export default UniformListItem;
