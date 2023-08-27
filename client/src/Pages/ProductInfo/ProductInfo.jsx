import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../Redux/LoaderSlice'
import { GetAllBids, GetProductById } from '../../Api/productsApi'
import { useParams } from 'react-router-dom';
import Divider from '../../Components/Divider';
import moment from "moment"
import { Button } from 'antd';
import NewBidModalPage from '../../Components/NewBidModalPage/NewBidModalPage';

export default function ProductInfo() {
    const userData = useSelector(state => state.users.user)
    // const [bidsData, setBidsData] = useState(null)            //komentarii
    const [product, setProduct] = useState(null)          //sam product
    const [selectedImage, setselectedImage] = useState(0)
    const [showBidModal, setShowBidModal] = useState(false)         //pokazat modalnoye okno

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const { id } = useParams()

    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetProductById(id)

            if (response.success) {
                setProduct(response.data)

                const bidsResponse = await GetAllBids({ product: id })
                if (bidsResponse.success) {
                    setProduct({
                        ...response.data,
                        bids: bidsResponse.data
                    });
                    // setBidsData(bidsResponse.data);

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

    useEffect(() => {
        if (showBidModal) {
            // document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            getData();
        }
    
        return () => {
            document.body.style.overflow = 'unset';
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showBidModal]);

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
                                <span>{product.price} ₼</span>
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
                            <div className='flex justify-between mt-2'>
                                <span>Purchased Year</span>
                                <span>{currentYear - product.age} ({product.age} years ago)</span>
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
                                    onClick={() => setShowBidModal(true)}
                                    disabled={userData._id === product.seller._id}
                                >
                                    New Bid
                                </Button>
                            </div>
                            {product?.showBidsOnProductPage && product.bids?.length > 0 && (
                                product.bids.map((bid) => {
                                    return (
                                        <div className="border border-gray-300 border-solid p-2 mb-2 rounded">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Name</span>
                                                <span>{bid.buyer.name}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Bid Amount</span>
                                                <span>{bid.bidAmount}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Bid Place On</span>
                                                <span>{moment(bid.buyer.createdAt).format("MMM D, YYYY hh:mm A")}</span>
                                            </div>

                                        </div>
                                    )
                                })

                            )}
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
