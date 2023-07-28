import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../Components/Divider';
import { RegisterUser } from '../../Api/usersApi';

export default function RegisterPage() {
  const navigate = useNavigate();


  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values)
      console.log(response)
      if (response.succes) {
        message.success(response.message)
        navigate("/login")
      }
      else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  };


  const rules = [
    {
      required: true,
      message: "required"
    }

  ]
  return (
    <div className='h-screen flex justify-center items-center bg-slate-400'>
      <div className='bg-white p-5 w-[450px]'>

        <h1 className='uppercase'>smp - <span className='text-gray-400'>register</span></h1>
        <Divider />
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type='password' placeholder='Password' />
          </Form.Item>
          <Button type="primary" htmlType='submit' block className='mt-2' >
            Antd Button
          </Button>

        </Form>
        <div className='mt-5 text-center'>
          <span>Already have an account ? <Link className='text-primary no-underline' to={"/login"}>Login</Link></span>
        </div>
      </div>
    </div>
  )
}
