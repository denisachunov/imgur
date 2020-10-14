import { API_URL, Response } from '../const';

export default async ( tag, page=1 ) => {
    let result = [];
    if ( tag.length ) {
        const apiUrl = API_URL.replace ( '{TAG}', tag ).replace ( '{PAGE}', page );
        try {
            const response = await fetch ( apiUrl );
            if ( response.status === Response.OK ) {
                result = await response.json();
            }
        }
        catch ( e ) {
            console.log ( e );
        }
    }
    return result.data && result.data.items ? result.data.items : [];
}