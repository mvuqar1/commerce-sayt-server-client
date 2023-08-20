import { fetchInstance } from "./fetchInstance.jsx"
const fetchUrl = "http://localhost:5001"

export const RegisterUser = async (payload) => {
    try {
        const request = await fetch(`${fetchUrl}/api/user/register`, {
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
export const LoginUser = async (payload) => {
    try {
        const request = await fetch(`${fetchUrl}/api/user/login`, {
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
export const GetCurrentUser = async () => {
    try {
        const response = await fetch(`${fetchUrl}/api/user/get-current-user`, fetchInstance());
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
};
export const GetAllUsers = async () => {
    try {
        const response = await fetch(`${fetchUrl}/api/user/get-all-users`, fetchInstance());
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
};

export const UserStatusUpdate = async (id,status) => {
    try {
        const request = await fetch(`${fetchUrl}/api/user/update-user-status/${id}`,{
            method: "PUT",
            headers: {
                ...fetchInstance().headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(status)
        })
        const data = await request.json()
        return data
    } catch (error) {
        return error.message
    }
}