import { Flex, Text } from '@chakra-ui/core';
import TopNavigation from '../components/TopNavigation';

export default function Home(): JSX.Element {
  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
    >
      <TopNavigation />
      <Text>Dashboard</Text>
    </Flex>
  );
}
