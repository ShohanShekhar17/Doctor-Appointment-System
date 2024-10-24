import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
import { Row, Col} from 'antd'
import {useDispatch } from 'react-redux'
import Doctor from '../components/Doctor'
import {showloading, hideloading} from '../redux/alertsSlice'
//import { Layout } from 'antd';

function Home() {
    const [doctors, setDoctor] = useState([])
    const dispatch = useDispatch()
    const getData = async () => {

        try {
            dispatch(showloading())
            const response = await axios.get('/api/user/get-all-approved-doctors',  {

                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                },

            });
          //  console.log(response.data)
            dispatch(hideloading())
          if(response.data.success){
            setDoctor(response.data.data)
          }

        } catch (error) {
            dispatch(hideloading())
            console.log(error)
        }
    }


    useEffect(() => {

        getData()

    }, [])
    return (
        <Layout>
            <Row gutter={20}>
                {doctors.map((doctor)=>(
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Doctor doctor={doctor}/>
                    </Col>
                ))}
            </Row>
        </Layout>
        
    )
}

export default Home