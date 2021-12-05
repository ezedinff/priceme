import {Box, Heading, Text, Button, Center} from '@chakra-ui/react';
import {Link, Outlet} from "react-router-dom";

const PageNotFound = () => {
    return (
        <Center width={"100vw"} height={"100vh"}>
            <Box textAlign="center" py={10} px={6}>
                <Heading
                    display="inline-block"
                    as="h1"
                    size="4xl"
                    fontWeight={"bolder"}
                    bgGradient="linear(to-r, teal.400, teal.600)"
                    backgroundClip="text">
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color={'gray.500'} mb={6}>
                    The page you're looking for does not seem to exist
                </Text>

                <Link to={"/"}>
                    <Button
                        colorScheme="teal"
                        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                        color="white"
                        variant="solid">
                        Go to Home
                    </Button>
                </Link>
            </Box>
        </Center>
    );
}

export default PageNotFound;
