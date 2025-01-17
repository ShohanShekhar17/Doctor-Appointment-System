import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'

function DoctorForm({onFinish, initialValues} ) {

    
    return (
        <Form layout='vertical' onFinish={onFinish} initialValues={{
            ...initialValues,
            ...(initialValues && {
                timing:[
                    moment(initialValues.timing[0], "HH:mm"),
                    moment(initialValues.timing[1], "HH:mm")
    
                ],
            }
               
            ),
           
        }}>
            <h1 className='card-tittle mt-3'>Personal Information</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='First Name' name="firstName" rules={[{ required: true }]}>
                        <Input placeholder='First Name' />
                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Last Name' name="lastName" rules={[{ required: true }]}>
                        <Input placeholder='Last Name' />
                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Phone Number' name="phoneNumber" rules={[{ required: true }]}>
                        <Input placeholder='Phone Number' />
                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Website' name="website" rules={[{ required: true }]}>
                        <Input placeholder='Website' />
                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Address' name="address" rules={[{ required: true }]}>
                        <Input placeholder='Address' />
                    </Form.Item>

                </Col>

            </Row>
            <hr />
            <h1 className='card-tittle mt-3'>Professional Information</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Specialization' name="specialization" rules={[{ required: true }]}>
                        <Input placeholder='Specialization' />
                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Experience' name="experience" rules={[{ required: true }]}>
                        <Input placeholder='Experience' type='number' />
                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Fee Per Consultation' name="FeePerConsultant" rules={[{ required: true }]}>
                        <Input placeholder='Fee Per Consultation' type='number' />
                    </Form.Item>

                </Col>
               { <Col span={8} xs={24} sm={24} lg={8}>

                    <Form.Item required label='Timing' name="timing" rules={[{ required: true }]}>
                        <TimePicker.RangePicker format="HH:mm"/>
                    </Form.Item>

                </Col>
                 }

            </Row>

            <div className='d-flex '>
                <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
            </div>




        </Form>
    )
}

export default DoctorForm