import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Divider from '../../Components/Divider'
import { LoginUser } from '../../Api/usersApi';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../Redux/LoaderSlice';

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const onFinish = async (values) => {
    dispatch(SetLoader(true))

    try {
      const response = await LoginUser(values)
      if (response.succes) {
        message.success(response.message)
        localStorage.setItem("token",response.data)
        navigate("/")
        dispatch(SetLoader(false))
      }
      else {
        message.error(response.message)
        dispatch(SetLoader(false))
      }
    }catch (error) {
      message.error(error)
      dispatch(SetLoader(false))
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className='h-screen flex justify-center items-center bg-slate-400'>
      <div className='bg-white p-5 w-[450px]'>

        <h1 className='uppercase'>smp - <span className='text-gray-400'>login</span></h1>
        <Divider />
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' placeholder='Password' />
          </Form.Item>
          <Button type="primary" htmlType='submit' block >
            Antd Button
          </Button>

        </Form>
        <div className='mt-5 text-center'>
          <span>Dont't have an account ? <Link className='text-primary no-underline' to={"/register"}>Register</Link></span>
        </div>
      </div>
    </div>
  )
}
