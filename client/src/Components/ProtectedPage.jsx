/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../Api/usersApi'
import { Avatar, Badge, message } from "antd"
import { useNavigate } from 'react-router-dom'
import { UserSwitchOutlined, LogoutOutlined } from '@ant-design/icons'
import { BellOutlined } from '@ant-design/icons';
import { SetLoader } from '../Redux/LoaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../Redux/UserSlice'
import Notifications from './Notifications/Notifications'
import { GetAllNotifications, ReadAllNotifications } from '../Api/notificationsApi'

export default function ProtectedPage({ children }) {
    const userData = useSelector(state => state.users.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [notifications, setNotifications] = useState([])
    const [readNotifications, setReadNotifications] = useState()
    const [showNotifications, setShowNotifications] = useState(false)

    const validateToken = async () => {
        dispatch(SetLoader(true))
        try {
            const response = await GetCurrentUser()
            if (response.succes) {
                dispatch(SetUser(response.data))
                dispatch(SetLoader(false))
            }
            else {
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
    const getNotifications = async () => {
        dispatch(SetLoader(true))
        try {
            const response = await GetAllNotifications()
            if (response.success) {
                setNotifications(response.message)
                dispatch(SetLoader(false))
            }
        } catch (error) {
            console.log(error)
            message.error(error.message)
            dispatch(SetLoader(false))

        }
    }
    const readAllNotifications=async()=>{
        dispatch(SetLoader(true))
        try {
            dispatch(SetLoader(false))
            const response = await ReadAllNotifications()
            if (response.success) {
                setNotifications(response.message)
                dispatch(SetLoader(false))
            }
        } catch (error) {
            console.log(error)
            message.error(error.message)
            dispatch(SetLoader(false))
    }
}

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken()
            getNotifications()

        }
        else {
            message.error("Please login")
            navigate("/login")
        }
    }, [])

    useEffect(()=>{
        
    })

    return (
        <div>
            {userData && (
                <div>
                    <div className='flex items-center justify-between p-5 bg-primary text-2xl  uppercase'>
                        <h1 className='text-white' onClick={() => navigate("/")}>
                            shey mp
                        </h1>
                        <div className='bg-white rounded py-2 px-2 flex items-center gap-1'>
                            <UserSwitchOutlined />
                            <span
                                className='underline cursor-pointer'
                                onClick={() => {
                                    if (userData.role === "user") {
                                        navigate("/profile")
                                    } else {
                                        navigate("/admin")
                                    }
                                }}
                            >
                                {userData?.name}
                            </span>
                            <Badge count={notifications?.filter((notification) => !notification.read).length}>
                                <Avatar
                                    shape="circle"
                                    size="large"
                                    icon={<BellOutlined className='text-red-500' />}
                                    onClick={() => {
                                        setShowNotifications(true);
                                        readAllNotifications()
                                    }}
                                />
                            </Badge>
                            <LogoutOutlined
                                className='cursor-pointer ml-6'
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    navigate("/login")
                                }}
                            />
                        </div>
                    </div>
                    <div className='mx-2 mt-2 mb-2'>
                        {children}
                    </div>

                    <Notifications
                        notifications={notifications}
                        setNotifications={setNotifications}
                        readNotifications={readNotifications}
                        setReadNotifications={setReadNotifications}
                        showNotifications={showNotifications}
                        setShowNotifications={setShowNotifications}
                    />
                </div>
            )}
        </div>
    )
}
