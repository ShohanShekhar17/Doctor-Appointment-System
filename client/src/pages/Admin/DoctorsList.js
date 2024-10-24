import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertsSlice'
import axios from 'axios'
import { Table } from 'antd'
import moment from 'moment'

function DoctorsList() {
    const [doctors, setDoctor] = useState([])
    const dispatch = useDispatch()


    const getDoctorsData = async () => {

        try {

            dispatch(showloading())
            const response = await axios.get('/api/admin/get-all-doctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideloading())
            if (response.data.success) {
                setDoctor(response.data.data)
            }

        } catch (error) {
            dispatch(hideloading())


        }

    }

    const changeDoctorStatus = async (record, status) => {

        try {

            dispatch(showloading())
            const response = await axios.post('/api/admin/change-doctor-account-status', {doctorId: record._id, userId: record.userId, status: status },  {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideloading())
            if (response.data.success) {
                getDoctorsData()
            }

        } catch (error) {
            dispatch(hideloading())


        }

    }



    useEffect(() => {

        getDoctorsData()

    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )

        },
        {
            title: 'phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text, record) => (
                moment(record.createdAt).format('DD-MM-YYYY')
            )
        },
        {
            title: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' && <h1 className='anchor' onClick={()=>changeDoctorStatus(record, 'approved')}>Approve</h1>}
                    {record.status === 'approved' && <h1 className='anchor' onClick={()=>changeDoctorStatus(record, 'blocked')}>Block</h1>}

                </div>
            )

        }


    ]
    return (
        <Layout>
            <h1 className='page-header'>DoctorsList</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default DoctorsList