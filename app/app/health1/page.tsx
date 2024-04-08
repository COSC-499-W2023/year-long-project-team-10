"use client"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { health1 } from "./api/health1api.js"; 

export default function main(){

    const [healthstat, sethealthstat] = useState();

    useEffect(() => {
        async function fetchHealth() {
            try {
                console.log("you are on the client side 1"); 
                const response = await health1();
                console.log("came back from the server. server says: ", response)
                sethealthstat(response);
            } catch (error) {
                console.error("error in contacting the file:", error);
            }
        }

        fetchHealth();
    }, []);

          
  return(
      <>
        <h1> {healthstat}</h1>
      </>
  );
}