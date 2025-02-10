

import { SHORTY_API_DOMAIN, SHORTY_API_ABORT_TIMEOUT } from "astro:env/client"


export const postUrl = async (url: string, submittableToken: string): Promise<string> => {
    const response = await fetch(`${SHORTY_API_DOMAIN}`, {
        signal: AbortSignal.timeout(Number(SHORTY_API_ABORT_TIMEOUT) || 10000),
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "recaptcha": submittableToken
        },
        body: JSON.stringify({ url }),
    });

    const data = await response.json();
    
    if(response.status === 400){
        throw new Error(typeof(data.message)==="string"?data.message:data.message[0]);
    }


    if(response.status !== 201){
        throw new Error("Failed to shorten URL");
    }
    
    return data?.shortUrl;
}
