async function getData(url = "") {
    const response = await fetch(url, {
        method: "GET", // POST, PUT, DELETE ...       
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer <token>"
        },
    })
    return response.json();
};

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST", // POST, PUT, DELETE ...       
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    //console.log(response);
    return response;
};

async function deleteData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "DELETE", // POST, PUT, DELETE ...       
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    //console.log(response);
    return response;
};

async function putData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "PUT", // POST, PUT, DELETE ...       
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    //console.log(response);
    return response;
};


async function postFormData(url = "", formData = {}) {
    try {
        const response = await fetch(url, {
            method: "POST", // POST, PUT, DELETE ... 
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        //console.log(responseData);
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for the caller to handle
    }
};