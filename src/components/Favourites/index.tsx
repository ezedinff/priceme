import React from "react";
import {Box, Heading, IconButton, List, ListIcon, ListItem} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

interface Props{
    title: string;
    results: Array<string>;
    favourites: Array<string>;
    toggleFavourite: (value: string) => void;
    result: VoidFunction;
}
const Favourites: React.FC<Props> = ({title, results, favourites, toggleFavourite, result}) => {
    return (
        <Box borderWidth='1px' p={"24px"} borderRadius={"md"}>
            <Heading my={"16px"} size='md' borderBottomWidth={"1px"}> {title} </Heading>
            <List spacing={3}>
                {
                    results.map((r) => {
                        return (<ListItem key={r} borderWidth={"1px"}  p={"8px"}
                                          display={"flex"}
                                          alignItems={"center"}
                                          _hover={{ bg: 'gray.100' }}>
                                <ListIcon
                                    fontSize={"1.2em"}
                                    as={IconButton}
                                    bg={"transparent"}
                                    alignItems={"center"}
                                    onClick={() => {toggleFavourite(r); result();}}
                                    height={"100%"}
                                    py={"8px"}
                                    _hover={{ bg: 'transparent' }}
                                    aria-label={'favourite button'}
                                    icon={<StarIcon color={favourites.includes(r) ? 'yellow.500' : 'gray.500'} />}
                                />
                                {r}
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    );
}


export default Favourites;
