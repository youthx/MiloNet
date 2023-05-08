import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { collection, doc, orderBy, query, setDoc, where } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { database } from "lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddComment({ postID, uid }) {
  const [isFetching, setFetching] = useState(false);
  const toast = useToast();

  async function addComment(comment) {
    setFetching(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(database, "comments", id);
    await setDoc(docRef, { ...comment, id, postID, date, uid });

    toast({
      title: "Successfully posted comment!",
      status: "success",
      isClosable: true,
      duration: 2000,
      position: "bottom",
    });
    setFetching(false);
  }

  return { addComment, isFetching };
}

export function useComments(postID) {
  const q = query(
    collection(database, "comments"),
    where("postID", "==", postID),
    orderBy("date", "desc")
  );
  const [comments, isFetching, error] = useCollectionData(q);
  if (error) throw error;

  return { comments, isFetching };
}
