import { List, ListItem } from '@chakra-ui/react';
import { LinkImageCard } from 'components/card';
import { LinkContent } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants, listVariants } from 'utils/variants';

const contents: LinkContent[] = [
  {
    id: 'clothe',
    name: 'ユニフォーム',
    image: '/images/uniform.jpg',
    link: 'clubtool',
  },
  {
    id: 'equipment',
    name: '用具',
    image: '',
    link: 'clubtool',
  },
];

const ClubToolList: VFC = () => {
  return (
    <MotionBox
      as={List}
      spacing={6}
      variants={listVariants}
      initial="closed"
      animate="open"
    >
      {contents.map((item) => (
        <MotionBox
          as={ListItem}
          key={item.id}
          variants={listItemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LinkImageCard item={item} />
        </MotionBox>
      ))}
    </MotionBox>
  );
};

export default ClubToolList;
