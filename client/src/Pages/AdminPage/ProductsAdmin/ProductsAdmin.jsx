import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../../Redux/LoaderSlice'
import { GetProducts, StatusUpdate } from '../../../Api/productsApi'

export default function ProductsAdmin() {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetProducts()
            if (response.success) {
                setProducts(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            dispatch(SetLoader(false))
        }
    }
    const onStatusUpdate = async (id, text) => {
        try {
            dispatch(SetLoader(true))
            await StatusUpdate(id, { status: text })
            await getData()
        } catch (error) {
            console.log(error)
        }
        finally {
            dispatch(SetLoader(false))
        }
    }


    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            title: "Seller",
            dataIndex: "seller",
            render: (text, record) => {
                return record.seller.name
            }
        },
        {
            title: "Product",
            dataIndex: "name"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Age",
            dataIndex: "age"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase()
            }
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const { status, _id } = record
                return (
                    <div className='flex gap-3'>
                        {status === "pending" &&
                            (<span
                                className='underline cursor-pointer'
                                key={`${_id}-approve`}
                                onClick={() => {
                                    onStatusUpdate(_id, "approved");
                                }}
                            >
                                Approve
                            </span>)}
                        {status === "pending" &&
                            (<span
                                className='underline cursor-pointer'
                                key={`${_id}-reject`}
                                onClick={() => {
                                    onStatusUpdate(_id, "rejected");
                                }}
                            >
                                Reject
                            </span>)}
                        {status === "approved" &&
                            (<span
                                className='underline cursor-pointer'
                                key={`${_id}-block`}
                                onClick={() => {
                                    onStatusUpdate(_id, "blocked");
                                }}
                            >
                                Block
                            </span>)}
                        {status === "blocked" &&
                            (<span
                                className='underline cursor-pointer'
                                key={`${_id}-unblock`}
                                onClick={() => {
                                    onStatusUpdate(_id, "approved");
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
            <Table className='mt-2' columns={columns} dataSource={products.map(product => ({ ...product, key: product._id }))} />
        </>
    )
}
