import useFetch from "use-http";
import {useCallback, useEffect, useState} from "react";
import {useAuthState} from "../contexts/auth";

function useFavourites() {
    const [favourites, setFavourites] = useState<Array<string>>([]);
    const authState = useAuthState();
    const {post, get, response, loading, error, data = []} = useFetch({  data: [] , cache: 'no-cache', mode: 'cors', headers: {Authorization: `bearer ${authState.token}`}});

    const toggleFavourite = useCallback(async (value: string) => {
        let {data} = await post('/api/favourites/toggle', {value});
        if(response.ok){
            setFavourites(data.favourites);
        }
    }, [post, response]);


    const loadFavourites = useCallback(async () => {
        let {data} = await get('/api/favourites');
        if(response.ok) {
            console.log(data);
            setFavourites(data.favourites);
        }
    }, [get, response]);



    useEffect(() => {
        loadFavourites().then();
    }, [loadFavourites, toggleFavourite]) // componentDidMount

    return {favouriteLoading: loading, favouriteError: error, favourites, toggleFavourite};
}

export default useFavourites;
