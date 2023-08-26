import { Modal } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Notifications({
    notifications=[],
    setNotifications,
    readNotifications,
    setReadNotifications,
    showNotifications,
    setShowNotifications }) {

        const navigate=useNavigate()

    
    return (
        <Modal
        title="Notifications"
        open={showNotifications}
        centered={true}
        footer={null}
        width={500}
        onCancel={() => setShowNotifications(false)}
        >
            {notifications.map((notification, index) => {
                return (
                    <div 
                    className='flex flex-col border border-solid p-2 mt-1 border-gray-300 rounded' 
                    key={index}
                        onClick={() => {
                            navigate(notification.onClick);
                            setShowNotifications(false)
                        }
                        }
                    >
                        <h3 className='m-0'>{notification.title}</h3>
                        <span>{notification.message}</span>
                    </div>
                )
            })}
        </Modal>
    )
}
