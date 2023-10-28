"use client"
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetchPosts = async (url: string) => {
    const resp = await fetch(url);

    if (!resp.ok) {
        throw new Error('Fetch error');
    }

    return resp.json();
}

const SearchPage = () => {
    const search = useSearchParams();
    const searchQ = search ? search.get("q") : null;

    const enSearchQ = encodeURI(searchQ || "");
    const {data, isLoading} = useSWR(
        `/search/api/search?q=${enSearchQ}` ,
        fetchPosts
        );


    console.log("Search Params", enSearchQ);

}

export default SearchPage;