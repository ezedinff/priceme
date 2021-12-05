import {useCallback, useEffect, useState} from "react";
import {useAuthState} from "../contexts/auth";

const fetchOptions: any = {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}
function useFavourites() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favourites, setFavourites] = useState<Array<string>>([]);
    const authState = useAuthState();
    fetchOptions.headers["Authorization"] = `bearer ${authState.token}`;

    const toggleFavourite = useCallback(async (value: string) => {
        fetchOptions['body'] = JSON.stringify({value});
        fetchOptions['method'] = 'POST';
        setLoading(true)
        fetch('/api/favourites/toggle', fetchOptions)
            .then(response => {
                const d = response.json();
                console.log(d)
                return d;
            })
            .then(response => setFavourites(response.data.favourites))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);


    const loadFavourites = useCallback(async () => {
        fetchOptions['body'] = undefined;
        fetchOptions['method'] = 'GET';
        fetch('/api/favourites', fetchOptions)
            .then(response => {
                const d = response.json();
                console.log(d)
                return d;
            })
            .then(response => setFavourites(response.data.favourites))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);



    useEffect(() => {
        loadFavourites().then();
    }, []) // componentDidMount

    return {favouriteLoading: loading, favouriteError: error, favourites, toggleFavourite, loadFavourites};
}

export default useFavourites;
