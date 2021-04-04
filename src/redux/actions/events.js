export const create = (body) => async () => {
    console.log(body)
    try {
        const res = await fetch("http://localhost:8001/api/createEvent", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                'enctype': 'multipart/form-data'
            },
            body: body
        });
        const data = await res.json();
        if(data) {
            alert(`${data.msg}`);
        }
    } catch (err) {
        throw new Error(err);
    }
};