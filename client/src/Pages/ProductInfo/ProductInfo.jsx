import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../Redux/LoaderSlice'
import { GetAllBids, GetProductById } from '../../Api/productsApi'
import { useParams } from 'react-router-dom';
import Divider from '../../Components/Divider';
import moment from "moment"
import { Button } from 'antd';
import NewBidModalPage from './NewBidModalPage/NewBidModalPage';

export default function ProductInfo() {
    const userData = useSelector(state => state.users.user)
    const [product, setProduct] = useState(null)
    const [selectedImage, setselectedImage] = useState(0)
     const [showBidModal, setShowBidModal] = useState(false)

    const {id} = useParams()

    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetProductById(id)
            
            if (response.success) {
                setProduct(response.data)
                
                const bidsResponse=await GetAllBids({product:id})
                if (bidsResponse.success) {
                    setProduct({
                        ...response.data,
                        bids: bidsResponse.data
                    });
                    }
                }
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

    return (
        product && (
            <div>
                <div className='grid grid-cols-2 gap-5'>{/*images*/}
                    <div className='flex flex-col gap-5'>
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className='w-full h-80 object-scale-down rounded-md'
                        />

                        <div className='flex gap-5'>
                            {product.images.map((image, index) => {
                                return (
                                    <img
                                    key={index}
                                        className={`w-20 h-20 object-cover rounded-md cursor-pointer" 
                                          ${selectedImage === index
                                                ? "first:border-2 border-green-700 border-dashed p-2"
                                                : ""}`}
                                        onClick={() => setselectedImage(index)}
                                        src={image}
                                        alt={index}
                                    />
                                )
                            })}

                        </div>
                        <Divider />
                        <div>
                            <h1 className='text-green-600'>
                                Added On
                            </h1>
                            <span className='text-green-600'>
                                {moment(product.createdAt).format("MMM D, YYYY hh:mm A")}
                            </span>
                        </div>
                    </div>


                    <div className="flex flex-col gap-5">
                        <div>
                            <h1 className="text-2xl font-semibold text-orange-900">{product.name}</h1>
                            <span>{product.description}</span>
                        </div>

                        <Divider />
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-semibold text-orange-900">
                                Product Details
                            </h1>

                            <div className='flex justify-between mt-2'>
                                <span>Price</span>
                                <span>{product.price} $</span>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <span>Category</span>
                                <span className='uppercase'>{product.category}</span>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <span>Bill Available</span>
                                <span>{product.billAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <span>Warranty Available</span>
                                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <span>Accesories Available</span>
                                <span>{product.accesoriesAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <span>Box Available</span>
                                <span>{product.boxAvailable ? "Yes" : "No"}</span>
                            </div>
                        </div>
                        <Divider />
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-semibold text-orange-900">
                                Seller Details
                            </h1>

                            <div className='flex justify-between mt-2'>
                                <span>Name</span>
                                <span>{product.seller.name}</span>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <span>Email</span>
                                <span>{product.seller.email}</span>
                            </div>

                        </div>
                        <Divider />
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                                <Button
                                onClick={()=>setShowBidModal(!showBidModal)}
                                disabled={userData._id===product.seller._id}
                                >
                                    New Bid
                                </Button>
                            </div>
                        </div>
                        {showBidModal &&
                        <NewBidModalPage
                        product={product}
                        setShowBidModal={setShowBidModal}
                        showBidModal={showBidModal}

                        />}
                    </div>
                </div>
            </div>

        )
    )
}
