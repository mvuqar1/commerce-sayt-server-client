import { Modal } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined } from "@ant-design/icons"
import { DeleteNotification } from '../../Api/notificationsApi'

export default function Notifications({
    notifications = [],
    setNotifications,
    showNotifications,
    setShowNotifications }) {

    const navigate = useNavigate()

    const deleteNotifications = async (id) => {
        const response = await DeleteNotification(id);
        if (response.success) {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification._id !== id)
            );
        }
    };
    

    return (
        <Modal
            title="Notifications"
            open={showNotifications}
            centered={true}
            footer={null}
            width={500}
            onCancel={() => setShowNotifications(false)}
        >
            {notifications?.map((notification, index) => {
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
                        <div className='flex justify-between items-end'>
                            <div>
                                <h3 className='m-0'>{notification.title}</h3>
                                <span>{notification.message}</span>

                            </div>
                            <DeleteOutlined onClick={(e) => {
                                e.stopPropagation(); // ostonovil vsplitiye
                                deleteNotifications(notification._id);
                            }} />
                        </div>
                    </div>
                )
            })}
        </Modal>
    )
}
