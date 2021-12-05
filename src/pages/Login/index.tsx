import {useLocation, useNavigate} from "react-router-dom";
import * as React from "react";

import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    CircularProgress, Center
} from '@chakra-ui/react';
import ErrorMessage from "../../components/ErrorMessage";
import PriceMeLogo from "../../components/Logo";
import {loginUser, useAuthDispatch, useAuthState} from "../../contexts/auth";


function LoginPage() {
    const [username, setUsername] = React.useState('maru.nega@gmail.com');
    const [password, setPassword] = React.useState('12345678');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    let navigate = useNavigate();
    let location = useLocation();
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();

    let from = location.state?.from?.pathname || "/calculator";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log(username);
            let response = await loginUser(dispatch, { username, password });
            navigate(from, { replace: true });
            setIsLoading(false);
        } catch (error) {
            setError('Invalid username or password');
            setIsLoading(false);
            setUsername('');
            setPassword('')
        }
    };
    return (
        <Flex width="100vw" height={"100vh"} align="center" justifyContent="center">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Center py={"16px"}>
                        <PriceMeLogo />
                    </Center>
                    <Heading size='md'> PriceMe </Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        {error && <ErrorMessage message={error} />}
                        <FormControl isRequired>
                            <FormLabel> Username </FormLabel>
                            <Input type="email"
                                   placeholder="test@test.com"
                                   size="lg"
                                   value={username}
                                   onChange = {event => setUsername(event.currentTarget.value)}
                            />
                        </FormControl>

                        <FormControl isRequired mt={6}>
                            <FormLabel> Password </FormLabel>
                            <Input type="password"
                                   placeholder="********"
                                   size="lg"
                                   value={password}
                                   onChange={event => setPassword(event.currentTarget.value)}
                            />
                        </FormControl>

                        <Button
                            bg={'green.400'}
                            color={'white'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{bg: 'green.500',}}
                            _focus={{bg: 'green.500',}}
                            variant="outline" width="full" mt={4} type="submit">
                            {isLoading ? (
                                <CircularProgress isIndeterminate size="24px" color="teal" />
                            ): (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}


export default LoginPage;
