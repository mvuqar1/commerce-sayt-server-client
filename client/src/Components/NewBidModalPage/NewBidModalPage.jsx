import { Form, Input, message } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../Redux/LoaderSlice'
import { PlaceNewBid } from '../../Api/productsApi'

export default function NewBidModalPage({ product, showBidModal, setShowBidModal }) {
    const userData = useSelector((state) => state.users.user)
    const dispatch = useDispatch()
    const rules = [{ required: true, message: "Required" }]
    const formRef = useRef();

    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true))
            const response = await PlaceNewBid({
                ...values,
                product: product._id,
                seller: product.seller._id,
                buyer: userData._id
            })
            dispatch(SetLoader(false))
            if (response.success) {
                message.success("Bid added succesfully")
                setShowBidModal(false)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            console.log(error)
        }
    }
    return (
        <>
            <Modal
                centered
                width={600}
                open={showBidModal}
                onCancel={() => setShowBidModal(false)}
                onOk={() => formRef.current.submit()}
            >
                <div className='flex flex-col gap-5'>
                    <h1 className='text-2xl font-semi-bold text-orange-900'>
                        New Bid
                    </h1>

                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                        ref={formRef}
                    >
                        <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item label="Message" name="message" rules={rules}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Mobile" name="mobile" rules={rules}>
                            <Input type='number' />
                        </Form.Item>
                    </Form>

                </div>
            </Modal>
        </>
    )
}
