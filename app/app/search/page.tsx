"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchProfiles } from "../search/api/search.js";
//import useSWR from "swr";
//import {member} from "@prisma/client";

// Function to fetch data from the specified URL
/*const fetchInfo = async (url: string) => {
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

    // Use the useSWR hook to fetch data from the specified URL
    const {data, isLoading} = useSWR<{findInfo: Array<member>}>(
        `./api/search?q=${enSearchQ}` , // I think the issue is starting from here
        fetchInfo
        );
        
    if (!data?.findInfo){
        return null;
    }


    console.log("Search Params", enSearchQ);

    // Render the data from the response
    return <div>{data.findInfo.map((member) => (
        <div>{member.name}</div>
    ))}
    </div>

}*/

const SearchPage = () => {
    //temporary
    console.log("made it to search page");
    //store the search query
    const [searchQ, setSearchQ] = useState('');

    //get search query from URL 
    const search = useSearchParams();
    const enSearchQ = encodeURI(search ? search.get("q") || '' : '');

    //update searchQ state when enSearchQ changes
    useEffect(() => {
      setSearchQ(enSearchQ);}, [enSearchQ]);
  
    // Fetch data from the backend using function from search api
    const fetchData = async () => {
      try {
        const response = await searchProfiles(enSearchQ);
        if (response) {
            console.log("data from server:", response);
        } else {
            console.error('failed to fetch data');
        }
        
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
  
    //get data when enSearchQ changes
    useEffect(() => {
      fetchData();
    }, [enSearchQ]);
  
    return (
      <div>
        <h1>Search Page</h1>
        <p>Search query: {searchQ}</p>
        {/*results*/}
      </div>
    );
  };
   



export default SearchPage;