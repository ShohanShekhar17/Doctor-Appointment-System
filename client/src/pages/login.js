import React from 'react';
import {  Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { hideloading, showloading } from '../redux/alertsSlice';

function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onFinish = async(values) =>{

      //  console.log("Received values of form:" , values);
      try {

        dispatch(showloading())

        const response = await axios.post('/api/user/login', values);

        dispatch(hideloading())
        if (response.data.success) {
            
            toast.success(response.data.message);
            toast("Redirecting to home page");
            localStorage.setItem("token", response.data.data)
            navigate('/');
        }
        else {
            toast.error(response.data.message);

        }

    } catch (error) {
        dispatch(hideloading())
        toast.error('Something went wrong');

    }

    }
  return (
    <div className='authentication'>
        <div className='authentication-form card p-5'>
            <h3 className='card-tittle'>Login Form</h3>
            <Form layout='vertical' onFinish={onFinish}>

                
                <Form.Item label='Email' name='email'>
                    <Input placeholder = 'Email'/>

                </Form.Item>
                <Form.Item label='Password' name='password'>
                    <Input placeholder = 'password' type='password'/>

                </Form.Item>

                <Button className='primary-button my-3' htmlType='submit'>LOGIN</Button>

                <Link to='/register' className='anchor'>Click here to register</Link>

            </Form>

        </div>
    </div>


  )
}

export default Login