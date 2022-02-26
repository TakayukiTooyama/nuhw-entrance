import { useDisclosure } from '@chakra-ui/hooks';
import { ListItem } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import type { Document } from '@nandorojo/swr-firestore';
import { fuego } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';
import { useRef } from 'react';

import { UniformTimeLimitCard } from '@/components/card';
import { DeleteDialog } from '@/components/dialog';
import type { UniformCardInfo, UserInfo } from '@/models/users';
import { MotionBox } from '@/utils/motion';
import { listItemVariants } from '@/utils/variants';

type Props = {
  data: Document<UniformCardInfo>;
  userInfo: UserInfo;
};

export const UniformManagementListItem: VFC<Props> = ({ data, userInfo }) => {
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
