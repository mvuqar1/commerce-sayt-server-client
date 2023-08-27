import { fetchUrl } from "./fetchInstance"


export const AddProduct = async (payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/products/add-product`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}
export const GetProducts = async (seller) => {
    try {
        const response = await fetch(`${fetchUrl}/api/products/get-products`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seller)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}
export const EditProduct = async (id, payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/products/edit-product/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}
export const DeleteProduct = async (id) => {
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
export const GetProductById = async (id) => {
    try {
        const response = await fetch(`${fetchUrl}/api/products/get-product-by-id/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const UploadImage = async (payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/products/upload-image-to-product`, {
            method: "POST",
            body: payload
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const DeleteImage = async (id,payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/products/delete-image-from-product/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const StatusUpdate = async (id,status) => {
    try {
        const response = await fetch(`${fetchUrl}/api/products/update-product-status/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(status)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const PlaceNewBid=async(payload)=>{
    try {
        const response=await fetch(`${fetchUrl}/api/bids/add-bid`,{
            method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
        })
        const data=await response.json()
        return data
    } catch (error) {
        return error.message
    }

}
export const GetAllBids = async (payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/bids/get-all-bids`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data
    } catch (error) {
        return { success: false, message: error.message };
    }
}