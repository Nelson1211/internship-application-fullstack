const variantURL = 'https://cfw-takehome.developers.workers.dev/api/variants';

addEventListener('fetch', event => {
        event.respondWith(handleRequest(event.request))
    })
    /**
     * Respond with hello worker text
     * @param {Request} request
     */
async function handleRequest(request) {
    const type = 'text/html;charset=UTF-8'
    const init = {
        headers: {
            'content-type': type
        }
    }
    const response = await fetch(variantURL);
    const jsonResponse = await response.json();
    const VAR1_RESPONSE = await fetch(jsonResponse.variants[0]);
    const VAR2_RESPONSE = await fetch(jsonResponse.variants[1]);
    let group = Math.random() < 0.5 ? 'var1' : 'var2' // 50/50 split
    console.log(group);
    let finalResponse = group === 'var1' ? VAR1_RESPONSE : VAR2_RESPONSE;
    const htmlResponse = await finalResponse.text();
    return new Response(htmlResponse, init)
}