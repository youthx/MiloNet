import React from "react";
import { Helmet } from "react-helmet";

import {
  Heading,
  Box,
  Center,
  Text
} from "@chakra-ui/react";

export default function Users() {
  return (
    <Center w="100%" h="100vh">
      <Helmet>
        <title>Milo - Users</title>
      </Helmet>
      <Box mx="1" maxW="md" p="9" borderWidth="3px" borderRadius="lg">
        <Heading mb="4" size="xl" textAlign="left">
          In Development
        </Heading>
        <Text align="center"> All Users </Text>
      </Box>
    </Center>
  );
}
