import {Link, Outlet} from "react-router-dom";
import * as React from "react";
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import WithNavigation from "../Navbar";

function PrivateLayout() {
    return (
        <Box>
            <WithNavigation />
            <Outlet />
        </Box>
    );
}

export default PrivateLayout;
