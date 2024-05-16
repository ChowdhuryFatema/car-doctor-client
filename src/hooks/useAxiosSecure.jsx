import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL: 'https://car-doctor-server-seven-lemon.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {

    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
            axiosSecure.interceptors.response.use(res => {
                return res;
            }, error => {
                console.log('error tracked in the interceptor', error.response);
                if( error.response.status === 401 || error.response.status === 403 ){
                    console.log('logout the user');
                    logOut()
                    .then()
                    .catch(err => console.log(err))
                    navigate('/')
                }
            }
        )
    }, [])

   return axiosSecure;
};

export default useAxiosSecure;