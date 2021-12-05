import {
    Box,
    Container,
    SimpleGrid,
    Select,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListIcon,
    Spinner,
    Center,
    IconButton,
    Text,
    NumberInput,
    NumberInputStepper,
    NumberDecrementStepper, NumberInputField, NumberIncrementStepper
} from "@chakra-ui/react";
import * as React from "react";
import useFetch, { Provider } from 'use-http';
import {
    StarIcon,
} from '@chakra-ui/icons';
import {useCallback, useEffect, useRef} from "react";
import useCommodities from "../../hooks/useCommodities";
import useFavourites from "../../hooks/useFavourites";
import Favourites from "../../components/Favourites";
function CalculatorPage() {
    const {commodities, commodityLoading, commodityError} = useCommodities();
    const {favourites, favouriteLoading, favouriteError, toggleFavourite} = useFavourites();
    const [commodity, setCommodity] = React.useState('');
    const [quantity, setQuantity] = React.useState(0);
    const [price, setPrice] = React.useState("");

    const [results, setResults] = React.useState<Array<string>>([]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        generateResults();
    }
    const generateResults = () => {
        const filterCommoditiesByName = commodities.filter((comm) => comm.COMMODITY_NAME === commodity);
        let p = Number(price);
        const generatedResults = filterCommoditiesByName.map((commodity) => `${commodity.COUNTRY} ${((p + Number(commodity.VAR_OVERHEAD)) * quantity).toFixed(2)} | (${p + Number(commodity.VAR_OVERHEAD)} * ${quantity}) + ${Number(commodity.FIXED_OVERHEAD)}`);
        setResults([...generatedResults]);
    }

    const format = (val: string) => `$` + val;
    const parse = (val: string) => val.replace(/^\$/, '')

    return(
        <Container maxW={'5xl'} py={12}>
            {
                commodityLoading ?
                    <Center  height={"50vh"} ><Spinner size='xl' /></Center>
                    :
                    <SimpleGrid columns={{ base: 1, md: 2 }}  p={"24px"} spacing={10}>
                    <Box borderWidth='1px' p={"24px"} borderRadius={"md"}>
                        <Heading my={"16px"} size='md' borderBottomWidth={"1px"}> Calculator </Heading>
                        <Box px={"16px"}>
                            <form onSubmit={handleSubmit}>
                                <FormControl isRequired mb={"16px"}>
                                    <FormLabel>Commodity</FormLabel>
                                    <Select onChange={event => setCommodity(event.currentTarget.value)} placeholder='Commodity' size="lg">
                                        {
                                            Array.isArray(commodities) && !commodityLoading &&  Array.from(new Set(commodities.map(d => d.COMMODITY_NAME)))
                                                .map((d) => <option key={d}  value={d}>{d}</option>)
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl isRequired  mb={"16px"}>
                                    <FormLabel>Quantity (in tons)</FormLabel>
                                    <NumberInput min={0} size={"lg"}>
                                        <NumberInputField onChange = {event => setQuantity(Number(event.currentTarget.value))}/>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <FormControl isRequired  mb={"16px"}>
                                    <FormLabel>Price per ton</FormLabel>
                                    <NumberInput value={format(price)} min={0} size={"lg"}>
                                        <NumberInputField onChange = {(event) => setPrice(parse(event.currentTarget.value))}/>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <Button
                                    bg={'green.400'}
                                    color={'white'}
                                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                    _hover={{bg: 'green.500',}}
                                    _focus={{bg: 'green.500',}}
                                    variant="outline" width="full" mt={4} type="submit">
                                    Calculate
                                </Button>
                            </form>
                        </Box>
                    </Box>
                        <Favourites title={"Results"} results={results} favourites={favourites} toggleFavourite={toggleFavourite} result={generateResults} />
                </SimpleGrid>
            }
        </Container>
    )
}

export default CalculatorPage;
