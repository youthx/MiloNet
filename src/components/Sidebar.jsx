import { Box, Button, Stack, Heading, Divider } from "@chakra-ui/react";
import { ViewIcon, EditIcon, AtSignIcon } from "@chakra-ui/icons";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_USERS, ROUTE_PROTECTED } from "lib/routes";
import { useAuth } from "hooks/auth";
import { ProfilePicture } from "./Profile";

function ActiveUser() {
  const { isUser, isFetching } = useAuth();
  if (isFetching) {
    return <Heading>Fetching..</Heading>;
  }
  return (
    <Stack align="center" spacing="6" my="8">
      <ProfilePicture user={isUser} size="xl" />
      <Heading>
        <AtSignIcon boxSize="7" />
        {isUser.username}
      </Heading>
      <Button
        variant="solid"
        colorScheme="green"
        mt="4"
        size="md"
        leftIcon={<EditIcon />}
        as={Link}
        to={`${ROUTE_PROTECTED}/profile/${isUser.id}`}
      >
        Edit Profile
      </Button>
    </Stack>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      px="6"
      height="100vh"
      w="100%"
      maxW="300px"
      borderLeft="3px solid"
      borderLeftColor="gray.100"
      position="sticky"
      top="16"
      display={{ base: "none", md: "block" }}
    >
      <Box align="center">
        <Box as="ul" borderbottom="3px solid" borderColor="gray.100">
          <ActiveUser />
          <Divider />
          <Button
            variant="solid"
            colorScheme="green"
            mt="4"
            size="md"
            mx="auto"
            leftIcon={<ViewIcon />}
            onClick={() => navigate(ROUTE_USERS)}
          >
            All Users
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
