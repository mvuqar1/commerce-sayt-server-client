/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { GetCurrentUser } from '../Api/usersApi'
import { message } from "antd"
import { useNavigate } from 'react-router-dom'
import { UserSwitchOutlined, LogoutOutlined } from '@ant-design/icons'
import { SetLoader } from '../Redux/LoaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../Redux/UserSlice'

export default function ProtectedPage({ children }) {
    const userData = useSelector(state => state.users.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateToken = async () => {
        dispatch(SetLoader(true))
        try {
            const response = await GetCurrentUser()
            if (response.succes) {
                dispatch(SetUser(response.data))
                dispatch(SetLoader(false))
            }
            else {
                console.log("useeffect -> async -> else")
                message.error(response.message)
                navigate("/login")
                dispatch(SetLoader(false))
            }
        } catch (error) {
            message.error(error.message)
            navigate("/login")
            dispatch(SetLoader(false))
        }
    }

    useEffect(() => {
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
            {userData && (
                <div>
                    <div className='flex items-center justify-between p-5 bg-primary text-2xl  uppercase'>
                        <h1 className='text-white'>
                            shey mp
                        </h1>
                        <div className='bg-white rounded py-2 px-2 flex items-center gap-1'>
                            <UserSwitchOutlined />
                            <span
                                className='underline cursor-pointer'
                                onClick={() => { navigate("/profile") }}
                            >
                                {userData?.name}
                            </span>
                            <LogoutOutlined
                                className='cursor-pointer ml-6'
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    navigate("/login")
                                }}
                            />
                        </div>
                    </div>
                    {children}
                </div>
            )}
        </div>
    )
}
