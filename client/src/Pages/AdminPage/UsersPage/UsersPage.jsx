import { Table} from 'antd'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useDispatch} from 'react-redux'
import { SetLoader } from '../../../Redux/LoaderSlice'
import { GetAllUsers, UserStatusUpdate } from '../../../Api/usersApi'

export default function UsersPage() {
    const [users,setUsers ] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetAllUsers()
            if (response.succes) {
                setUsers(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            dispatch(SetLoader(false))
        }
    }
    const onStatusUpdate = async (id,text) => {
        try {
            dispatch(SetLoader(true))
            await UserStatusUpdate(id,{status:text})
            await getData()
        } catch (error) {
            console.log(error)
        }
        finally{
            dispatch(SetLoader(false))
        }
    }
    
  
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            title: "Product",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            render:(text,record)=>{
                return record.role.toUpperCase()
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            render:(text,record)=>{
                return record.status.toUpperCase()
            }
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            render:(text,record)=>moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const {status,_id}=record
                return (
                    <div className='flex gap-3' key={_id}>
                        {status === "active" &&
                            (<span
                                className='underline cursor-pointer'
                                key={`${_id}-block`}
                                onClick={() => {
                                    onStatusUpdate(_id,"block");
                                }}
                            >
                                Block
                            </span>)}
                        {status === "block" &&
                            (<span
                                className='underline cursor-pointer'
                                key={`${_id}-unblock`}
                                onClick={() => {
                                    onStatusUpdate(_id,"active");
                                }} 
                            >
                                Unblock
                            </span>)}
                    </div>
                )
            }
        },
    ]
    return (
        <>
            <div className='flex justify-end'>
            </div>
            <Table className='mt-2' columns={columns} dataSource={users} />
        </>
    )
}
