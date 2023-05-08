import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ProfilePicture } from "./Profile";
import { AtSignIcon } from "@chakra-ui/icons";
import { useGetAllUsers } from "hooks/users";
import { format } from "date-fns";

export default function AllUsers() {
  const { users, isFetching } = useGetAllUsers();
  if (isFetching) return <Heading>Fetching...</Heading>;

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
      {users?.map((user) => (
        <Box
        mx="auto"
        maxW="600px"
        py="8"
        p="7"
        my="8"
        ml="auto"
        borderWidth="3px"
        borderRadius="lg">
        <Stack alignItems="center">
          <ProfilePicture user={user} />
          <Heading size="sm">
            <AtSignIcon />
            {user.username}
          </Heading>
          <Text color="#8a8989" fontSize={["sm", "lg"]}>
                Joined: {format(user.date, "MMM YYY")}
              </Text>
        </Stack>
        </Box>
      ))}
    </SimpleGrid>
  );
}
