import type { NextApiRequest, NextApiHandler, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET"){
        try {
            const {q: query} = req.query;

        } catch (error){

        }
    }
    
    
}