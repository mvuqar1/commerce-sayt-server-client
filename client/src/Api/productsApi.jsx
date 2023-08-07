const fetchUrl = "http://localhost:5001"


export const AddProduct = async (payload) => {
    try {
        const request = await fetch(`${fetchUrl}/api/products/add-product`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await request.json()
        return data
    } catch (error) {
        return error.message
    }
}
export const GetProducts = async () => {
    try {
        const request = await fetch(`${fetchUrl}/api/products/get-products`)
        const data = await request.json()
        return data
    } catch (error) {
        return error.message
    }
}
export const EditProduct = async (id, payload) => {
    try {
        const request = await fetch(`${fetchUrl}/api/products/edit-product/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await request.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const DeleteProduct = async (id) => {
    console.log(id)
    try {
        const request = await fetch(`${fetchUrl}/api/products/delete-product/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await request.json()
        return data
    } catch (error) {
        return error.message
    }
}