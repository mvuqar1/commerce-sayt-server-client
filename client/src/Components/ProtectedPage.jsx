import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../Api/usersApi'
import { message } from "antd"
import { useNavigate } from 'react-router-dom'

export default function ProtectedPage({ children }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    const token = localStorage.getItem("token")
    console.log(token)

    const validateToken = async () => {
        console.log("validate duwdum")
        try {
            const response = await GetCurrentUser()
            console.log(response)
            if (response.succes) {
                setUser(response.data)
            }
            else {
                console.log("useeffect -> async -> else")
                message.error(response.message)
                navigate("/login")
            }
        } catch (error) {
            message.error(error.message)
            navigate("/login")
        }
    }

    useEffect(() => {
        console.log("useffect")
        console.log(token)
        if (localStorage.getItem("token")) {
            validateToken()
        }
        else {
            message.error("Please login")
            navigate("/login")
        }
    }, [])
    return (
        <div>
            {user && (
                <div>
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    {/* и другие свойства, которые вы хотите отобразить */}
                </div>
                )}
        </div>
    )
}
