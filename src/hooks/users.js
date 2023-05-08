import { useToast } from "@chakra-ui/react";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

export function useGetUserFromUID(uid) {
  const q = query(doc(database, "users", uid));
  const [user, isFetching] = useDocumentData(q);
  return { user, isFetching };
}

export function useGetAllUsers() {
  const [users, isFetching] = useCollectionData(collection(database, "users"));
  return { users, isFetching };
}

export function useUpdateProfilePicture(uid) {
  const [picture, setPicture] = useState(null);
  const [isFetching, setFetching] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function commitProfilePicture() {
    setFetching(true);

    if (!picture) {
      toast({
        title: "Profile Updated!",
        status: "success",
        isClosable: true,
        duration: 2000,
        position: "bottom",
      });
      setFetching(false);
      return;
    }

    const fileRef = ref(storage, "pfps/" + uid);
    await uploadBytes(fileRef, picture);

    const pfpURL = await getDownloadURL(fileRef);
    const docRef = doc(database, "users", uid);
    await updateDoc(docRef, {
      pfp: pfpURL,
    });

    toast({
      title: "Profile Updated!",
      status: "success",
      isClosable: true,
      duration: 2000,
      position: "bottom",
    });
    setFetching(false);
    navigate(0);
  }

  return {
    setProfilePicture: setPicture,
    commitProfilePicture,
    pictureURL: picture && URL.createObjectURL(picture),
    isFetching,
  };
}
