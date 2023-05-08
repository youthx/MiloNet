import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "lib/firebase";
import { ROUTE_DASHBOARD, ROUTE_LOGIN } from "lib/routes";
import { useToast } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { isDuplicateUsername } from "lib/utils/username";

// Get the local user
export function useAuth() {
  const [authUser, fetching, error] = useAuthState(auth);
  const [isFetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      const ref = doc(database, "users", authUser.uid);
      const snapshot = await getDoc(ref);
      setUser(snapshot.data());
      setFetching(false);
    }

    if (!fetching) {
      if (authUser) {
        fetchData();
      } else {
        setFetching(false);
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching])
  return {
    isUser: user,
    isFetching: isFetching,

    errorInstance: error,
  };
}

// Register a new account
export function useRegister() {
  const [isFetching, setFetching] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password
  }) {
    setFetching(true);
    const usernameExists = await isDuplicateUsername(username);
    if (usernameExists) {
      toast({
        title: "Username is already taken!",
        description: "How about you try another username",
        status: "error",
        isClosable: true,
        duration: 4500,
        position: "bottom",
      });
      setFetching(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(database, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          date: Date.now(),
          pfp: ""
        });
        toast({
          title: "Successfully registered your account!",
          status: "success",
          isClosable: true,
          duration: 2000,
          position: "bottom",
        });
        navigate(ROUTE_DASHBOARD); 
      } catch (err) {
        toast({
          title: "Unable to register your account",
          description: err.message,
          status: "error",
          isClosable: true,
          duration: 4500,
          position: "bottom",
        });
      } finally {
        setFetching(false);
      }
    }
  }

  return {
    register,
    isFetching,
  };
}

// Login to an account
export function useLogin() {
  const [isFetching, setFetching] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirect = ROUTE_DASHBOARD }) {
    setFetching(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Successfully logged in!",
        status: "success",
        isClosable: true,
        duration: 2000,
        position: "bottom",
      });
      navigate(redirect);
    } catch (err) {
      toast({
        title: "Couldn't validate credentials",
        description: err.message,
        status: "error",
        isClosable: true,
        duration: 4500,
        position: "bottom",
      });

      setFetching(false);
      return false;
    }
    setFetching(false);
    return true;
  }

  return {
    login,
    isFetching,
  };
}

// Logout hook
export function useLogout() {
  const [signOut, isFetching, error] = useSignOut(auth);
  const navigate = useNavigate();
  const toast = useToast();

  async function logout() {
    if (await signOut()) {
      toast({
        title: "Successfully logged out!",
        status: "success",
        isClosable: true,
        duration: 2000,
        position: "top",
      });
      navigate(ROUTE_LOGIN);
    }
  }
  return { logout, isFetching };
}
