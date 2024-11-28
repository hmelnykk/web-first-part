const url = 'http://localhost:3001';

export const GET = async () => {
    return await fetch(`${url}/insects`).then(res => res.json());
}

export const POST = async (body) => {
    await fetch(`${url}/insects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
}

export const PUT = async (body) => {
    console.log(body);
    await fetch(`${url}/insects`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
}

export const DELETE = async (id) => {
    console.log(id);
    await fetch(`${url}/insects/${id}`, {
        method: "DELETE",
    })
}
