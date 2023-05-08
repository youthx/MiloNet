import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD } from "lib/routes";
import { useLogout } from "hooks/auth";
import { DeleteIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";

function Navbar() {
  const { logout, isFetching } = useLogout();
  const navigate = useNavigate();

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      justify="center"
      zIndex="3"
      height="16"
      borderTop="5px solid"
      bg="gray.100"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Button
          colorScheme="blackAlpha"
          variant="ghost"
          onClick={() => navigate(ROUTE_DASHBOARD)}
          rightIcon={<TriangleDownIcon />}
        >
          Dashboard
        </Button>
        <Button
          ml="auto"
          colorScheme="red"
          variant="ghost"
          rightIcon={<DeleteIcon />}
          onClick={logout}
          isLoading={isFetching}
          loadingText="Logging out"
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
export default Navbar;
