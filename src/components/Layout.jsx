import React from "react";
import { useEffect } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PROTECTED, ROUTE_LOGIN } from "lib/routes";

import { useAuth } from "hooks/auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Flex, Box } from "@chakra-ui/react";

function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isUser, isFetching } = useAuth();

  useEffect(() => {
    if (!isFetching && pathname.startsWith(ROUTE_PROTECTED) && !isUser) {
      navigate(ROUTE_LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isUser, isFetching]);

  if (isFetching) return "Fetching..";

  return (
    <>
      <Navbar />
      <Flex pt="16" pb="12" w="full" maxW="1200px" mx="auto">
        <Box w="900px">
          <Outlet />
        </Box>
        <Sidebar />
      </Flex>
    </>
  );
}
export default Layout;
