import { fetchInstance, fetchUrl } from "./fetchInstance"

export const AddNotification = async (payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/notifications/add-notification`, {
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

export const GetAllNotifications=async()=>{
    try {
        const response=await fetch(`${fetchUrl}/api/notifications/get-all-notifications`, fetchInstance())
        const data=await response.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const DeleteNotification=async(id)=>{
    console.log(id)
    try {
        const response=await fetch(`${fetchUrl}/api/notifications/delete-notification/${id}`,{
            method:"DELETE"
        })
        const data=await response.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const ReadAllNotifications=async()=>{
    try {
        const response=await fetch(`${fetchUrl}/api/notifications/read-all-notifications`,{
            method:"PUT",
            headers:{
                ...fetchInstance().headers,
            },
            body:JSON.stringify()
        })
        const data=await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error.message
    }
}