import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "lib/firebase";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useNewPost() {
  const [isFetching, setFetching] = useState(false);
  const toast = useToast();

  async function newPost(post) {
    setFetching(true);
    const id = uuidv4();
    await setDoc(doc(database, "posts", id), {
      date: Date.now(),
      hearts: [],
      id,
      ...post,
    });
    setFetching(false);

    toast({
      title: "Successfully posted!",
      status: "success",
      isClosable: true,
      duration: 2000,
      position: "bottom",
    });
  }
  return { newPost, isFetching };
}

export function useGetPosts(uid = null) {
  const toast = useToast();

  const q = uid
    ? query(collection(database, "posts"), orderBy("date", "desc"), where("uid", "==", uid))
    : query(collection(database, "posts"), orderBy("date", "desc"));
  const [posts, isFetching, error] = useCollectionData(q);
  if (error) {
    toast({
      title: "Unexpected error",
      description: error.message,
      status: "error",
      isClosable: true,
      duration: 2000,
      position: "bottom",
    });
    throw error;
  }
  return { posts, isFetching };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isFetching, setFetching] = useState(false);

  async function toggleLike() {
    setFetching(true);
    const docRef = doc(database, "posts", id);
    await updateDoc(docRef, {
      hearts: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setFetching(false);
  }
  return { toggleLike, isFetching };
}

export function useDeletePost(id) {
  const [isFetching, setFetching] = useState(false);
  const toast = useToast();
  let deleteType = "Post";
  async function deletePost(isComment) {
    setFetching(true);
    if (isComment) {
      deleteType = "Comment";
      const docRef = doc(database, "comments", id);
      await deleteDoc(docRef);
    } else {
      const docRef = doc(database, "posts", id);
      await deleteDoc(docRef);

      // comments query
      const q = query(collection(database, "comments"), where("postID", "==", id));
      const snapshot = await getDocs(q);
      snapshot.forEach(async (comment) => {
        deleteDoc(comment);
        
      })
    }
    toast({
      title: `${deleteType} deleted successfully!`,
      status: "success",
      isClosable: true,
      duration: 2000,
      position: "bottom",
    });
    setFetching(false);
  }

  return { deletePost, isFetching }; 
}

export function usePost(id) {
  const q = doc(database, "posts", id);
  const [post, isFetching] = useDocumentData(q);

  return { post, isFetching };
}
