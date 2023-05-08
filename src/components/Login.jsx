import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { ROUTE_REGISTER } from "lib/routes";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";

import { emailValidate, passwordValidate } from "../formValidate";

import {
  FormControl,
  Heading,
  Box,
  Center,
  Input,
  FormErrorMessage,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";

function Login() {
  const { login, isFetching } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleLogin(load) {
    const result = await login({
      email: load.email,
      password: load.password,
    });
    if (result) reset();
  }

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="3px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Login
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl isInvalid={errors.email} py="2">
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email", emailValidate)}
            />

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} py="2">
            <Input
              type="password"
              placeholder="Password"
              {...register("password", passwordValidate)}
            />

            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            w="full"
            mt="4"
            size="md"
            type="submit"
            colorScheme="green"
            isLoading={isFetching}
            loadingText="Logging in"
          >
            Login to Milo
          </Button>
        </form>
        <Text mt="4" colorScheme="gray">
          Don't have an account?{" "}
          <Link
            fontWeight="medium"
            color="teal"
            as={ReactLink}
            to={ROUTE_REGISTER}
          >
            Register here!
          </Link>
        </Text>
      </Box>
    </Center>
  );
}

export default Login;
