import { Col, Form, Input, Row, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {SetLoader} from "../../Redux/LoaderSlice"
import { AddProduct, EditProduct } from '../../Api/productsApi'


export default function EditGeneralTab({formRef,setModalOpen,selectProduct,setSelectedProduct,handleProductAddedOrUpdated}) {

    const dispatch=useDispatch()
    const [form] = Form.useForm();
    const {user}=useSelector((state)=>state.users)
    const additionalsThings = [
        {
            label: "Bill available",
            name: "billAvailable",
        },
        {
            label: "Warranty available",
            name: "warrantyAvailable",
        },
        {
            label: "Accesories available",
            name: "accesoriesAvailable",
        },
        {
            label: "Box available",
            name: "boxAvailable",
        },
    ]
    const rules = [
        {
            required: true,
            message: "Please use input"
        }
    ]
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            let response = null;

            if (selectProduct) {
                response = await EditProduct(selectProduct._id,values);
            } else {
                values.seller = user._id;
                values.status = "pending";
                response = await AddProduct(values);
            }

            if (response.success) {
                message.success(response.message);
                setModalOpen(false);
                setSelectedProduct(null)
                handleProductAddedOrUpdated()
            }
    
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(SetLoader(false));
        }
    };

    useEffect(() => {
        if (selectProduct) {
            form.setFieldsValue(selectProduct);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectProduct]);
    return (
        <>
            <Form
                layout='vertical'
                ref={formRef}
                onFinish={onFinish}
                initialValues={{
                    name: selectProduct?.name || '', // Use default value if 'selectProduct.name' is undefined
                    description: selectProduct?.description || '',
                    price: selectProduct?.price || '',
                    category: selectProduct?.category || 'electronics',
                    age: selectProduct?.age || '',
                    billAvailable: selectProduct?.billAvailable || false,
                    warrantyAvailable: selectProduct?.warrantyAvailable || false,
                    accesoriesAvailable: selectProduct?.accesoriesAvailable || false,
                    boxAvailable: selectProduct?.boxAvailable || false,
                    showBidsOnProductPage: selectProduct?.showBidsOnProductPage || false,
                }}
            >
                <Form.Item label="Name" name="name" rules={rules}>
                    <input type="text" />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={rules} >
                    <input type="textarea" />
                </Form.Item>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label="Price" name="price" initialValue="" rules={rules}>
                            <Input type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Category" name="category" initialValue="electronics" rules={rules}>
                            <select>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home</option>
                                <option value="sport">Sport</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Age" name="age" initialValue="" rules={rules}>
                            <Input type='number' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <div className='flex gap-10'>
                        {additionalsThings.map((item, index) =>{
                            return(
                                <Form.Item key={index} label={item.label} name={item.name} valuePropName="checked">
                                <Input
                                type='checkbox'
                                    onChange={(e) => {
                                        formRef.current.setFieldsValue({
                                            [item.name]: e.target.checked
                                        });
                                    }}
                                />
                            </Form.Item>
                        )})}
                         <Form.Item key={"showBidsOnProductPage"} label="Show Bids On Product Page" name={"showBidsOnProductPage"} valuePropName="checked">
                                <Input
                                type='checkbox'
                                    onChange={(e) => {
                                        formRef.current.setFieldsValue({
                                            showBidsOnProductPage: e.target.checked
                                        });
                                    }}
                                />
                            </Form.Item>
                    </div>
                </Row>

            </Form>
        </>
    )
}
