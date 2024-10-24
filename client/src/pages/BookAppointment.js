import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { hideloading, showloading } from '../redux/alertsSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, DatePicker, Row, TimePicker } from 'antd'
import moment from 'moment'
import toast from 'react-hot-toast'

function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false)
    const [date, setDate] = useState()
    const navigate = useNavigate()
    const [time, setTime] = useState()
    const { user } = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()

    const getDoctorData = async () => {


        try {
            dispatch(showloading())
            const response = await axios.post('/api/doctor/get-doctor-info-by-id',
                {
                    doctorId: params.doctorId,
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

    const checkAvailability = async () => {

        try {
            dispatch(showloading())
            const response = await axios.post('/api/user/check-booking-availability',
                {
                    doctorId: params.doctorId,
                    date: date,
                    time: time,

                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }
            )
            dispatch(hideloading())
            if (response.data.success) {

                toast.success(response.data.message)
                

            } else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error('Error in Booking Appointment')
            dispatch(hideloading())


        }

    }

    const bookNow = async () => {

        try {
            dispatch(showloading())
            const response = await axios.post('/api/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date: date,
                    time: time,

                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }
            )
            dispatch(hideloading())
            if (response.data.success) {

                toast.success(response.data.message)
                navigate('/appointments')

            }


        } catch (error) {
            toast.error('Error in Booking Appointment')
            dispatch(hideloading())


        }

    }


    useEffect(() => {

        getDoctorData()

    }, []);
    return (
        <Layout>
            {doctor && (

                <div>
                    <h1 className='page-tittle'>
                        {doctor.firstName} {doctor.lastName}
                    </h1>
                    <hr />
                    <Row gutter={20} className='mt-5' align="middle">

                        <Col span={8} sm={24} xs={24} lg={8}>


                            <img src='https://pngimagesfree.com/wp-content/uploads/Book-Now-Vector-PNG.png'
                                alt='booknow'

                                width="100%"
                                height="400"
                            />


                        </Col>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <h1 className='normal-text'><b>Timing: </b>{doctor.timing[0]} - {doctor.timing[1]}</h1>
                            <p ><b>Phone Number: </b>{doctor.phoneNumber}</p>
                            <p ><b>Address: </b>{doctor.address}</p>
                            <p ><b>Fee Per Visit: </b>{doctor.FeePerConsultant}</p>

                            <div className='d-flex flex-column pt-2'>
                                <DatePicker format="DD-MM-YYYY" onChange={(value) => {

                                    setDate(moment(value).format("DD-MM-YYYY"))

                                }} />
                                <TimePicker format="HH:mm" className='mt-3' onChange={(value) => {

                                    setTime(moment(value).format("HH:mm"))
                                }} />
                                <Button className='primary-button mt-3' onClick={checkAvailability}>Check Availability</Button>

                                <Button className='primary-button mt-3' onClick={bookNow}>Book Now</Button>


                            </div>

                        </Col>

                    </Row>

                </div>


            )}
        </Layout>
    )
}

export default BookAppointment