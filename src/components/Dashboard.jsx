import React from "react";
import { Helmet } from "react-helmet";
import Post from "./Post";

import {
  Heading,
  Box,
  Input,
  Button,
  HStack,
  Stack,
  Textarea,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useGetPosts, useNewPost } from "hooks/posts";
import { useAuth } from "hooks/auth";

export function CommunityPosts(props) {
  return (
    <>
      {props.posts?.length === 0 ? (
        <Text fontSize="xl">No posts yet :/</Text>
      ) : (
        props.posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </>
  );
}
function Dashboard() {
  const { register, handleSubmit, reset } = useForm();
  const { isUser, isFetching: userFetching } = useAuth();
  const { newPost, isFetching } = useNewPost();
  const { posts, isFetching: isFetchingPosts } = useGetPosts();

  //const toast = useToast();

  function handlePost(load) {
    newPost({
      uid: isUser.id,
      text: load.text,
      title: load.title,
    });
    reset();
  }

  if (isFetching || userFetching || isFetchingPosts) {
    return <Heading>Fetching...</Heading>;
  }
  return (
    <>
      <Helmet>
        <title>Milo - Dashboard</title>
      </Helmet>
      <Box
        mx="auto"
        maxW="600px"
        py="10"
        p="9"
        my="8"
        ml="3"
        borderWidth="3px"
        borderRadius="lg"
      >
        <form onSubmit={handleSubmit(handlePost)}>
          <Stack>
            <Heading size="lg">Dashboard</Heading>
            <StackDivider />
            <HStack justify="space-between">
              <Input
                fontSize="2xl"
                size="lg"
                placeholder="Title"
                variant="flushed"
                autoCorrect="false"
                autoCapitalize="false"
                {...register("title", { required: true })}
              />
              <Button
                variant="solid"
                colorScheme="green"
                mt="4"
                size="md"
                type="submit"
                isLoading={isFetching || userFetching}
                leftIcon={<PlusSquareIcon />}
              >
                Post
              </Button>
            </HStack>
            <Textarea
              as={TextareaAutosize}
              resize="none"
              mt="5"
              minRows={5}
              Placeholder="Tell us whats up!"
              {...register("text", { required: true })}
            />
          </Stack>
        </form>
      </Box>
      <Box
        mx="auto"
        maxW="600px"
        px="4"
        py="10"
        p="9"
        my="8"
        ml="3"
        borderWidth="3px"
        borderRadius="lg"
      >
        <Stack>
          <Heading size="lg">Community</Heading>
          <StackDivider />

          <CommunityPosts posts={posts} />
        </Stack>
      </Box>
    </>
  );
}
export default Dashboard;
