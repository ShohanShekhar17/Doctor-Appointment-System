import React from 'react'
import Layout from '../components/Layout'
//import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showloading, hideloading } from '../redux/alertsSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DoctorForm from '../components/DoctorForm'
import moment from 'moment'

function ApplyDoctor() {


    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const navigate = useNavigate()

    const onFinish = async(values) => {
        try {

            dispatch(showloading())
            const response = await axios.post('/api/user/apply-doctor-account', {...values, userId: user._id,
                timing: [
                    moment(values.timing[0]).format("HH:mm"),
                    moment(values.timing[1]).format("HH:mm"),
                ],
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideloading())
            if (response.data.success) {
                
                toast.success(response.data.message);
                
                navigate('/');
            }
            else {
                toast.error(response.data.message);

            }

        } catch (error) {
            dispatch(hideloading());
            toast.error('Something went wrong');

        }
    }
    return (
        <Layout>
            <h1 className='page-tittle'>Apply Doctor</h1>
            <hr />
            <DoctorForm onFinish={onFinish}/>
            
        </Layout>
    )
}

export default ApplyDoctor