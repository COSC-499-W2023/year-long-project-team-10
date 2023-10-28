"use client"
import { useRouter } from "next/navigation";
import {useState} from "react";

const Search = () => {
    const [searchQ, setSearchQ] = useState("");

    const router = useRouter();


    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();

        const encodedSearchQ = encodeURI(searchQ);
        router.push(`/search?q=${encodedSearchQ}`);
        console.log ("current query" , encodedSearchQ);

    };
    return (
        <form className="flex w-1/3" onSubmit={onSearch}>
        
            <input type = "search"
            value={searchQ}
            onChange={(event) => setSearchQ(event.target.value)}
            placeholder = "Search Here"
            className = "w-full p-3 rounded-lg text-white bg-slate-700 text-sm"
             />
        
        </form>
        
        
    );

}

export default Search;