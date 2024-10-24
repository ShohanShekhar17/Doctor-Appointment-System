import React from 'react'
import { Button, Form, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { hideloading, showloading } from '../redux/alertsSlice';

function Register() {

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const onFinish = async (values) => {
        
        

        try {

            dispatch(showloading())
            const response = await axios.post('/api/user/register', values);
            dispatch(hideloading())
            if (response.data.success) {
                
                toast.success(response.data.message);
                toast("Redirecting to login page");
                navigate('/login');
            }
            else {
                toast.error(response.data.message);

            }

        } catch (error) {
            dispatch(hideloading());
            toast.error('Something went wrong');

        }

        console.log("Received values of form:", values);

    }
    return (
        <div className='authentication'>
            <div className='authentication-form card p-5'>
                <h3 className='card-tittle'>Register Form</h3>
                <Form layout='vertical' onFinish={onFinish}>

                    <Form.Item label='Name' name='name'>
                        <Input placeholder='Enter your name' />

                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' />

                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='password' type='password' />

                    </Form.Item>

                    <Button className='primary-button my-3' htmlType='submit'>REGISTER</Button>

                    <Link to='/login' className='anchor'>Click here to login</Link>

                </Form>

            </div>
        </div>


    )
}

export default Register