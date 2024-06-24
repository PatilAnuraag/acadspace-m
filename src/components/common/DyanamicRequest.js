export const handleDynamicRequest = async (method, url, requestBody, wrongResponse, rightResponse) => {
    try {
       const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
       const data = await response.json();
        setTimeout(()=>{
            if (!response.ok) {
                wrongResponse();
            }
           else if (response.ok) {
            if(data){
                rightResponse(data);
       }
            }
        },100);
        
    } catch (error) {
        console.error('API Error:', error);
    }
};


export const handleDynamicRequestHeader = async (method, url, requestBody,token, wrongResponse, rightResponse) => {
    try {
         const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
               'token':token
            },
            body: JSON.stringify(requestBody),
        });
       const data = await response.json();
        setTimeout(()=>{
            if (!response.ok) {
                wrongResponse(data);
            }
           else if (response.ok) {
            if(data){
                rightResponse(data);
            }
            }
        },10);
        
    } catch (error) {
        console.error('API Error:', error);
        wrongResponse(error);
    }
};
// export const handleDynamicRequestHeader = async (method, url, requestBody, token, wrongResponse, rightResponse) => {
//     try {
//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'token': token
//             },
//             body: JSON.stringify(requestBody),
//         });
//         const data = await response.json();

//         if (!response.ok) {
//             wrongResponse();
//         } else {
//             rightResponse(data);
//         }
//     } catch (error) {
//         console.error('API Error:', error);
//     }
// };