import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";

export default function InDev({ pageName }) {
  return (
    <Center w="100%" h="100vh">
      <Helmet>
        <title>Milo - {pageName}</title>
      </Helmet>
      <Box mx="1" maxW="md" p="9" borderWidth="3px" borderRadius="lg">
        <Heading mb="4" size="xl" textAlign="left">
          In Development
        </Heading>
        <Text align="center"> {pageName} </Text>
      </Box>
    </Center>
  );
}
