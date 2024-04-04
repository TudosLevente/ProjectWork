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
    console.log(response);
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
    console.log(response);
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
    console.log(response);
    return response;
};


async function postFormData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST", // POST, PUT, DELETE ... 
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + data.boundary,
        },
        body: data
    })
    console.log(response);
    return response;
};