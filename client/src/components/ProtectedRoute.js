import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideloading, showloading } from "../redux/alertsSlice";
function ProtectedRoute(props) {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async () => {


        try {
            dispatch(showloading())
            const response = await axios.post('/api/user/get-user-info-by-id',
                { token: localStorage.getItem('token') },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }
            )
            dispatch(hideloading())
            if (response.data.success) {

                dispatch(setUser(response.data.data));
                
            }
            else {
                localStorage.clear()
                navigate("/login")
            }

        } catch (error) {
            dispatch(hideloading())
            localStorage.clear()
            navigate("/login")

        }

    }
    useEffect(() => {

        if (!user ) {

            getUser()

        }
    }, [user]);

    if (localStorage.getItem("token")) {
        return props.children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
