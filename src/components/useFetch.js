import { useEffect, useState } from "react";

const useFetch = (url, id) => {
    let [isPending, setIsPending] = useState(true);
    let [data, setData] = useState(null);
    let [error, setError] = useState(null);

    useEffect(() => {
        if (url === undefined) {
            console.log(Error("The Url You have Just Passed Is Undefined !"));
            return;
        }
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw Error("can not fetch the data");
            }
            return res.json();
        })
        .then(data => {
            // Get Specific Item
            if (id) {
                setData(
                    data.filter(item => item.id === id)[0]
                    );
                } else {
                // Get All Data
                setData(data)
            }
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    }, [url])
    return {data, isPending, error}
}

export default useFetch;