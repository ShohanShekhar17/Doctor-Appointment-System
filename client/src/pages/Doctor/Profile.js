import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import DoctorForm from '../../components/DoctorForm'
import { } from 'antd'

//import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { hideloading, showloading } from '../../redux/alertsSlice'
import moment from 'moment'


function Profile() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const params = useParams()
    const [doctor, setDoctor] = useState(null)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {

            dispatch(showloading())
            const response = await axios.post('/api/doctor/update-doctor-profile', {
                ...values, userId: user._id,
                timing: [
                    moment(values.timing[0]).format("HH:mm"),
                    moment(values.timing[1]).format("HH:mm"),
                ],
            }, {
                headers: {
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
            console.log(error)
            dispatch(hideloading());
            toast.error('Something went wrong');

        }
    }


    const getDoctorData = async () => {


        try {
            dispatch(showloading())
            const response = await axios.post('/api/doctor/get-doctor-info-by-user-id',
                {
                    userId: params.userId,
                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }
            )
            dispatch(hideloading())
            if (response.data.success) {

                setDoctor(response.data.data)

            }


        } catch (error) {
            console.log(error)
            dispatch(hideloading())


        }

    }
    useEffect(() => {

        getDoctorData()

    }, []);
    return (
        <Layout>
            <h1>Doctor's profile</h1>
            <hr />
            {doctor && (<DoctorForm onFinish={onFinish} initialValues={doctor} />)}
        </Layout>
    )
}

export default Profile