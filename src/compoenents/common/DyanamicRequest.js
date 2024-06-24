export const handleDynamicRequest = async (method, url, requestBody, wrongResponse, rightResponse) => {
    try {
        console.log(method)
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        console.log(requestBody)
        console.log(url)
        const data = await response.json();
        setTimeout(()=>{
            if (!response.ok) {
                wrongResponse();
                console.log('no response')
            }
           else if (response.ok) {
            if(data){
                rightResponse(data);
                console.log('Got response')
            }
            }
        },100);
        
    } catch (error) {
        console.error('API Error:', error);
    }
};
