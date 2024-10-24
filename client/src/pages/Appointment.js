import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../redux/alertsSlice'
import axios from 'axios'
import { Table } from 'antd'
import moment from 'moment'

function Appointment() {
    const [appointments, setAppointments] = useState([])
    const dispatch = useDispatch()

    const getAppointmentsData = async () => {

        try {

            dispatch(showloading())
            const response = await axios.get('/api/user/get-appointments-by-user-id', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideloading())
            if (response.data.success) {
                setAppointments(response.data.data)
            }

        } catch (error) {
            dispatch(hideloading())


        }

    }

    useEffect(() => {

        getAppointmentsData()

    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Doctor',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.doctorInfo.firstName} {record.doctorInfo.lastName}</span>
            )

        },
        {
            title: 'phone',
            dataIndex: 'phoneNumber',
            render: (text, record) => (
                <span>{record.doctorInfo.phoneNumber}</span>
            )
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>{moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('HH:mm')}</span>
            )
        },
        {
            title: 'status',
            dataIndex: 'status',
        },
       


    ]
    return (
        <Layout>
            <h1 className='page-header'>Appointments</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default Appointment