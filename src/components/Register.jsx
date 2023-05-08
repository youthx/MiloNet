import React from "react";
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

import { Link as ReactLink } from "react-router-dom";
import { ROUTE_LOGIN } from "lib/routes";
import {
  usernameValidate,
  passwordValidate,
  emailValidate,
} from "formValidate";
import { useRegister } from "hooks/auth";
import { useForm } from "react-hook-form";

function Register() {
  const { register: signup } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleSignup(load) {
    const result = await signup({
      username: load.username,
      email: load.email,
      password: load.password,
    });
    if (result) reset();
  }
  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="3px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Register
        </Heading>

        <form onSubmit={handleSubmit(handleSignup)}>
          <FormControl isInvalid={errors.username} py="2">
            <Input
              placeholder="Username"
              {...register("username", usernameValidate)}
            />
          </FormControl>
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
            isLoading={false}
            loadingText="Registering"
          >
            Register
          </Button>
        </form>

        <Text mt="4" colorScheme="gray">
          Already have an account?{" "}
          <Link
            fontWeight="medium"
            color="teal"
            as={ReactLink}
            to={ROUTE_LOGIN}
          >
            Login here!
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
export default Register;
