//function to fetch data from backend based on search query
export async function searchProfiles(query) {
    //temporary
    console.log("made it to search.js api");
    
    try {
        const resp = await fetch('http://localhost:6969/search/api/search?q=${query}');
        if (resp.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('fetch data fail');
            return null;
        }

    } catch (error){
        console.error('error during fetch', error);
        return null;

    }
}