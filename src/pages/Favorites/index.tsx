import {Center, Container, Heading, Spinner} from "@chakra-ui/react";
import Favourites from "../../components/Favourites";
import * as React from "react";
import useFavourites from "../../hooks/useFavourites";
import {useEffect} from "react";

function FavoritesPage() {
    const {favourites, favouriteLoading, loadFavourites, favouriteError, toggleFavourite} = useFavourites();
    useEffect( () => {

    }, [favourites])
    return <Container maxW={'3xl'} py={12}>

        {
            favouriteLoading ?
                <Center  height={"50vh"} ><Spinner size='xl' /></Center>
                :
                (
                    favourites.length ?
                        <Favourites result={() => {}} title={"Favourites"} results={favourites} favourites={favourites} toggleFavourite={toggleFavourite} />
                        : <Center  height={"50vh"} >
                             <Heading size={"3xl"} color={"gray.500"}>You have no favourites!</Heading>
                         </Center>
                )
        }
    </Container>
}
export default FavoritesPage;
