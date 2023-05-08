import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ProfilePicture } from "./Profile";
import { useGetUserFromUID } from "hooks/users";
import { Link, useParams } from "react-router-dom";
import { ROUTE_PROTECTED } from "lib/routes";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon, PlusSquareIcon, TimeIcon } from "@chakra-ui/icons";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { useAuth } from "hooks/auth";
import { useToggleLike, useDeletePost, usePost } from "hooks/posts";
import { useForm } from "react-hook-form";
import { useAddComment, useComments } from "hooks/comments";

const ADMIN_USER = "eq54iKgj43b1PALvVECqBeaWdlx1";

export function PostActions(props) {
  const { id, uid, hearts } = props.post;
  const { isUser: user, isFetching: isFetchingUser } = useAuth();
  const { deletePost, isFetching: isFetchingDelete } = useDeletePost(id);

  const isLiked = hearts.includes(user?.id);

  const { toggleLike, isFetching: isFetchingLike } = useToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });

  const { comments, isFetching: isFetchingComments } = useComments(id);
  if (isFetchingComments) return <Text>Fetching..</Text>;
  return (
    <Flex p="2">
      <Flex alignItems="center">
        <IconButton
          isRound
          variant="ghost"
          onClick={toggleLike}
          isLoading={isFetchingUser || isFetchingLike}
          icon={
            isLiked ? <AiFillLike size={23} /> : <AiOutlineLike size={23} />
          }
        />
        <Text>{hearts.length}</Text>
      </Flex>
      <Flex alignItems="center" ml="3">
        <IconButton
          isRound
          variant="ghost"
          icon={<BsChatLeft size={18} />}
          as={Link}
          to={`${ROUTE_PROTECTED}/${id}/comments`}
        />
        <Text>{comments.length}</Text>
      </Flex>
      {(user?.id === uid || user?.id === ADMIN_USER) && (
        <IconButton
          isRound
          variant="ghost"
          colorScheme="red"
          onClick={() => {
            deletePost(false);
          }}
          isLoading={isFetchingDelete}
          icon={<DeleteIcon size={18} />}
          ml="auto"
        />
      )}
    </Flex>
  );
}
export default function Post(props) {
  const { text, title, uid, date } = props.post;
  const { user, isFetching: isFetchingUser } = useGetUserFromUID(uid);
  if (isFetchingUser || !user) return <Heading>Fetching...</Heading>;
  return (
    <Box p="2" maxW="600px">
      <Box
        mx="auto"
        maxW="600px"
        py="10"
        p="3"
        my="3"
        ml="3"
        borderWidth="3px"
        borderRadius="lg"
      >
        <Flex alignItems="center" p="2" bg="gray.100" borderRadius="md">
          <ProfilePicture size="sm" user={user} />
          <Box ml="4">
            <Heading
              fontSize="sm"
              as={Link}
              to={`${ROUTE_PROTECTED}/profile/${uid}`}
              _hover={{ color: "teal" }}
            >
              {user.username}
            </Heading>
            <Text fontSize="sm" color="#8a8989">
              <TimeIcon boxSize={3} alignSelf="center" />{" "}
              {formatDistanceToNow(date)} ago
            </Text>
          </Box>
        </Flex>
        <Stack>
          <Heading>{title}</Heading>
          <StackDivider />

          <Text wordBreak="break-word" fontSize={["sm", "md"]}>
            {text}
          </Text>
        </Stack>
        <PostActions post={props.post} />
      </Box>
    </Box>
  );
}

export function Comments() {
  const { id } = useParams();
  const { post, isFetching: isFetchingPost } = usePost(id);

  if (isFetchingPost) return <Heading>Fetching...</Heading>;
  return (
    <>
      <Box p="2" maxW="600px">
        <Post post={post} />
      </Box>
      <Box
        mx="auto"
        maxW="550px"
        py="10"
        p="9"
        my="8"
        ml="8"
        borderWidth="3px"
        borderRadius="lg"
      >
        <Stack>
          <NewComment post={post} />
          <CommentList post={post} />
          <StackDivider />
        </Stack>
      </Box>
    </>
  );
}

export function CommentList({ post }) {
  const { id } = post;
  const { comments, isFetching } = useComments(id);
  if (isFetching) return <Heading>Fetching...</Heading>;

  return (
    <Stack>
      <Heading size="lg">Comments</Heading>
      <StackDivider />
      {comments.length === 0 ? (
        <Text fontSize="xl">No comments yet :/</Text>
      ) : (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </Stack>
  );
}

export function Comment({ comment }) {
  const { text, uid, date, id } = comment;
  const { user, isFetching } = useGetUserFromUID(uid);
  const { isUser, isFetching: isFetchingAuth } = useAuth();
  const { deletePost, isFetching: isFetchingDelete } = useDeletePost(id);

  if (isFetching || isFetchingAuth || isFetchingDelete)
    return <Heading>Fetching...</Heading>;

  return (
    <Box p="2" maxW="600px">
      <Box
        mx="auto"
        maxW="600px"
        py="10"
        p="3"
        my="3"
        ml="3"
        borderWidth="3px"
        borderRadius="lg"
      >
        <Flex alignItems="center" p="2" bg="gray.100" borderRadius="md">
          <ProfilePicture size="sm" user={user} />
          <Box ml="4">
            <Heading
              fontSize="sm"
              as={Link}
              to={`${ROUTE_PROTECTED}/profile/${uid}`}
              _hover={{ color: "teal" }}
            >
              {user.username}
            </Heading>
            <Text fontSize="sm" color="#8a8989">
              <TimeIcon boxSize={3} alignSelf="center" />{" "}
              {formatDistanceToNow(date)} ago
            </Text>
          </Box>
        </Flex>
        <Text wordBreak="break-word" fontSize={["sm", "md"]}>
          {text}
        </Text>
        {!isFetchingAuth && (isUser.id === uid || isUser.id === ADMIN_USER) && (
          <IconButton
            isRound
            variant="ghost"
            colorScheme="red"
            onClick={() => {
              deletePost(true);
            }}
            isLoading={isFetchingDelete}
            icon={<DeleteIcon size={18} />}
            ml="auto"
          />
        )}
      </Box>
    </Box>
  );
}

export function NewComment({ post }) {
  const { id: postID } = post;

  const { isUser, isFetching: isFetchingUser } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const { addComment: createComment, isFetching: isFetchingComment } =
    useAddComment({ postID, uid: isUser?.id });

  function addComment(data) {
    createComment({
      text: data.text,
    });
    reset();
  }
  if (isFetchingUser) return <Heading>Fetching...</Heading>;

  return (
    <Box>
      <Flex padding="4">
        <Box flex="1" ml="4">
          <form onSubmit={handleSubmit(addComment)}>
            <Box>
              <Flex alignItems="center" p="2" bg="gray.100" borderRadius="md">
                <ProfilePicture size="sm" user={isUser} />
                <Box ml="4">
                  <Heading
                    fontSize="sm"
                    as={Link}
                    to={`${ROUTE_PROTECTED}/profile/${isUser.id}`}
                    _hover={{ color: "teal" }}
                  >
                    {isUser.username}
                  </Heading>
                </Box>
              </Flex>
              <Input
                fontSize="2xl"
                size="md"
                placeholder="Comment"
                variant="flushed"
                autoCorrect="false"
                autoCapitalize="false"
                autoComplete="off"
                {...register("text", { required: true })}
              />
            </Box>
            <Flex pt="2">
              <Button
                variant="solid"
                colorScheme="green"
                mt="4"
                size="sm"
                type="submit"
                ml="auto"
                isLoading={isFetchingComment || isFetchingUser}
                leftIcon={<PlusSquareIcon />}
              >
                Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
