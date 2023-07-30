import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../Api/usersApi'
import {message} from "antd"
import { useNavigate } from 'react-router-dom'

export default function ProtectedPage({children}) {
    const navigate=useNavigate()
    const [user,setUser]=useState(null)
    
    const token = localStorage.getItem("token")
    
    const validateToken=async()=>{
        try {
            const response=await GetCurrentUser()
            console.log(response)
            if(response.succes){
                setUser(response.data)
            }
            else{
                message.error(response.message)
                navigate("/login")
            }
        } catch (error) {
            message.error(error.message)
            navigate("/login")
        }
    }
    
    useEffect(()=>{
        if(token){
            validateToken()
        }
        else{
            message.error("Please login")
            navigate("/login")
        }
    },[])
  return (
    <div>
        {user && (
            <div>
                {user.name}
                {children}
            </div>
            )}
        <p>{user}</p>
    </div>
  )
}
