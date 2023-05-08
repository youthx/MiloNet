import { AtSignIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetPosts } from "hooks/posts";
import { ROUTE_PROTECTED } from "lib/routes";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { CommunityPosts } from "./Dashboard";
import { useGetUserFromUID, useUpdateProfilePicture } from "hooks/users";
import { format } from "date-fns";
import { useAuth } from "hooks/auth";
import {
  BsFillSaveFill,
  BsSave,
  BsSave2Fill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";

export function ProfilePicture(props) {
  if (!props.user) {
    return <Avatar size={props.size} />;
  }

  return (
    <Avatar
      size={props.size}
      src={props.override || props.user.pfp}
      as={Link}
      to={`${ROUTE_PROTECTED}/profile/${props.user.id}`}
      _hover={{
        cursor: "pointer",
        opacity: "0.5",
      }}
    />
  );
}

export function EditProfileModal(props) {
  const {
    setProfilePicture,
    commitProfilePicture,
    pictureURL,
    isFetching: isLoadingFileCall,
  } = useUpdateProfilePicture(props.user.id);
  function handleChange(event) {
    setProfilePicture(event.target.files[0]);
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton avatar />
        <ModalBody>
          <HStack spacing="5">
            <ProfilePicture user={props.user} override={pictureURL} />
            <FormControl py="4">
              <FormLabel htmlFor="picture">Change Avatar</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} />
            </FormControl>
          </HStack>
          <Button
            leftIcon={<BsFillCheckCircleFill />}
            onClick={commitProfilePicture}
            loadingText="..."
            w="full"
            my="6"
            colorScheme="green"
            isLoading={isLoadingFileCall}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default function Profile() {
  const { id } = useParams();
  const { posts, isFetching: isFetchingPosts } = useGetPosts(id);
  const { user, isFetching: isFetchingUser } = useGetUserFromUID(id);
  const { isUser, isFetching: isFetchingAuth } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isFetchingUser || isFetchingAuth) return <Heading>Fetching...</Heading>;
  return (
    <Stack mx="auto" spacing="5" align="left">
      <Flex p={["4", "6"]} pos="relative" align="center">
        <Stack ml="10">
          <Box
            mx="auto"
            maxW="600px"
            py="10"
            p="9"
            my="9"
            ml="auto"
            borderWidth="3px"
            borderRadius="lg"
          >
            <HStack>
              {isFetchingUser ? (
                <Heading>Fetching...</Heading>
              ) : (
                <>
                  <ProfilePicture user={user} />
                  <Heading>
                    <AtSignIcon boxSize={7} />
                    {user.username}
                  </Heading>
                </>
              )}
              {user.id === isUser.id && (
                <Button
                  leftIcon={<EditIcon />}
                  onClick={onOpen}
                  ml="auto"
                  size="sm"
                  colorScheme="green"
                >
                  Edit Profile
                </Button>
              )}
            </HStack>

            <HStack spacing="7">
              <Text color="#8a8989" fontSize="xl">
                Posts: {posts.length}
              </Text>
              {/*
              <Text color="#8a8989" fontSize={["sm", "lg"]}>
                Total Likes: 10
              </Text> */}
              <Text color="#8a8989" fontSize="xl">
                Joined: {format(user.date, "MMM YYY")}
              </Text>
            </HStack>
          </Box>
          <EditProfileModal user={isUser} isOpen={isOpen} onClose={onClose} />
          <Box
            mx="auto"
            maxW="600px"
            py="10"
            p="9"
            my="8"
            ml="20"
            borderWidth="3px"
            borderRadius="lg"
          >
            {isFetchingPosts ? (
              <Heading>Fetching...</Heading>
            ) : (
              <CommunityPosts posts={posts} />
            )}
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
}
