import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Container,
  Divider,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { InferGetStaticPropsType, NextPage } from 'next';
import { FaQuestion } from 'react-icons/fa';
import { getAllFaq } from 'utils/api';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const Faq: NextPage<Props> = ({ allFaq }) => (
  <Layout title="FAQ">
    <TopHeading title="FAQ" />
    <Container maxW="xl" py={8} align="center">
      <Accordion allowToggle>
        {allFaq.contents.map((item) => (
          <AccordionItem key={item.id}>
            <h2>
              <AccordionButton>
                <HStack flex="1" spacing={4} textAlign="left" aling="center">
                  <Icon as={FaQuestion} color="red.400" />
                  <Text>{item.question}</Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <Divider />
            <AccordionPanel p={4}>
              <HStack spacing={4} alignItems="flex-start" textAlign="left">
                <Text fontWeight="bold" fontSize="18px">
                  A
                </Text>
                <Text>{item.answer}</Text>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
    <TabBar />
  </Layout>
);

export const getStaticProps = async () => {
  const allFaq = await getAllFaq();

  return {
    props: { allFaq },
    revalidate: 60,
  };
};
export default Faq;
