import { Button, Table, message } from 'antd'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from 'react'
import ProductsForm from './ProductsForm/ProductsForm'
import moment from "moment"
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../../Redux/LoaderSlice'
import { DeleteProduct, GetProducts } from '../../../Api/productsApi'

export default function ProductsPage() {
    const [modalOpen, setModalOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [selectProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetProducts()
            if (response.success) {
                setProducts(response.products)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            dispatch(SetLoader(false))
        }
    }
    
    const deleteProduct=async(id)=>{
        try {
            dispatch(SetLoader(true))
            const response=await DeleteProduct(id);
            if (response.success) {
                message.success(response.message);
                handleProductAddedOrUpdated();
            }
        } catch (error) {
            message.error(error.message);
        }
        finally{
            dispatch(SetLoader(false))
        }
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleProductAddedOrUpdated = () => {
        getData(); // Refresh data after adding or updating
    };


    const columns = [
        {
            title: "Name",
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
            dataIndex: "status"
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render:(text,record)=>moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className='flex gap-5'>
                        <DeleteOutlined
                        key={`delete-${record._id}`}
                        onClick={() => 
                           deleteProduct(record._id)
                        }
                        />
                        <EditOutlined 
                            key={`edit-${record._id}`}
                            onClick={() => {
                            setSelectedProduct(record);
                            setModalOpen(true)
                        }} />
                    </div>
                )
            }
        },
    ]
    return (
        <>
            <div className='flex justify-end'>
                <Button
                    type='default'
                    onClick={() => { setModalOpen(true) }}
                >
                    Add Products
                </Button>
            </div>
            <Table className='mt-2' columns={columns} dataSource={products} />
            {modalOpen && (
                <ProductsForm
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    selectProduct={selectProduct}
                    setSelectedProduct={setSelectedProduct}
                    handleProductAddedOrUpdated={handleProductAddedOrUpdated}
                />)}
        </>
    )
}
