import useFetch from "use-http";
import {useCallback, useEffect} from "react";
import * as React from "react";
interface Commodity {
    COUNTRY: string;
    COMMODITY_NAME: string;
    FIXED_OVERHEAD: string;
    VAR_OVERHEAD: string;
}
function useCommodities() {
    const [commodities, setCommodities] = React.useState<Array<Commodity>>([]);
    const {get, response, loading, error, data = []} = useFetch('https://run.mocky.io/v3/82521491-eea0-4b63-a452-c3ee1cdb7892',{ data: [] });

    const loadCommodities = useCallback(async () => {
        let d = await get();
        if(response.ok) {
            let t = d.slice(0, d.lastIndexOf(',')) + d.slice(d.lastIndexOf(',') + 1);
            setCommodities(JSON.parse(t));
        }
    }, [get, response])

    useEffect(() => {
        loadCommodities().then();
    }, [loadCommodities]) // componentDidMount

    return {commodityLoading: loading, commodityError: error, commodities};
}

export default useCommodities;
