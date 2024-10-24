import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { hideloading, showloading } from '../redux/alertsSlice'
import toast from 'react-hot-toast'
import { setUser } from '../redux/userSlice'

function Notification() {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const markallasseen = async () => {

        try {

            dispatch(showloading())
            const response = await axios.post('/api/user/mark-all-notification-as-seen', {userId: user._id},{

                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }

            });
            dispatch(hideloading())
            if (response.data.success) {

                toast.success(response.data.message);
                dispatch(setUser(response.data.data))
               
            }
            else {
                toast.error(response.data.message);

            }

        } catch (error) {
            dispatch(hideloading());
            toast.error('Something went wrong');

        }

    }


    const deleteAll = async () => {

        try {

            dispatch(showloading())
            const response = await axios.post('/api/user/delete-all-notification', {userId: user._id},{

                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }

            });
            dispatch(hideloading())
            if (response.data.success) {

                toast.success(response.data.message);
                dispatch(setUser(response.data.data))
               
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
            <h1 className='page-tittle'>Notifications</h1>

            <Tabs>
                <Tabs.TabPane tab='unseen' key={0}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor' onClick={()=> markallasseen()}>mark all as read</h1>
                    </div>
                    {user?.unseenNotification.map((notification) => (
                        <div className='card p-2 mt-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className='card-text'>{notification.message}</div>
                        </div>

                    ))}

                </Tabs.TabPane>
                <Tabs.TabPane tab='seen' key={1}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor' onClick={()=>deleteAll()}>delete all</h1>
                    </div>

                    {user?.seenNotification.map((notification) => (
                        <div className='card p-2 mt-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className='card-text'>{notification.message}</div>
                        </div>

                    ))}

                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notification