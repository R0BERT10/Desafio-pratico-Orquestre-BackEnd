const post = (bodyData: any) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    };
    return options
}

export const options = {
    POST: post
}