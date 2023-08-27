import { Divider, Modal, Table } from 'antd'
import moment from "moment"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../Redux/LoaderSlice'
import { GetAllBids } from '../../Api/productsApi'

export default function ProductsBidsPage({ showBids, SetShowBids,selectProduct,setSelectedProduct }) {
    const dispatch=useDispatch()
    const userData=useSelector((state)=>state.users.user)
    const [bids, setBids] = useState(null)

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetAllBids({ seller: userData._id, product: selectProduct._id })
            if (response.success) {
                setBids(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            dispatch(SetLoader(false))
        }
    }

    const columns=[
        { 
            title:"Name",
            dataIndex:"name",
            render: (text, record) => {
                return (
                    <div>
                        <p>{record.buyer.name}</p>
                    </div>
                );
            }
        },
        { 
            title:"Bid Amount",
            dataIndex:"bidAmount"
        },
        { 
            title:"Bid Date",
            dataIndex:"createAt",
            render:(text,record)=>{
                return moment(text).format("MMMM Do YYYYY, h:mm:ss a")
            }
        },
        { 
            title:"Message",
            dataIndex:"message"
        },
        {
            title: "Contact Details",
            dataIndex: "buyer",
            render: (text, record) => {
                return (
                    <div>
                        <p>Phone: {record.mobile}</p>
                        <p>Email: {record.buyer.email}</p>
                    </div>
                );
            }
        }
    ]

    useEffect(() => {
        if(selectProduct){
            getData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectProduct])
    
    return (
        <>
<Modal
    title=""
    width={1500}
    centered
    open={showBids}
    onCancel={() => SetShowBids(false)}
>
    <h1 className='text-xl text-gray-500'>Bids</h1>
    <Divider/>
    {bids && (
        <>
            <h1 className='text-xl text-gray-500'>
                Product name: {selectProduct.name}
            </h1>
            <Table columns={columns} key={bids._id} dataSource={bids}/>
        </>
    )}
</Modal>
        </>
    )
}
