import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";

const request: AxiosInstance = axios.create({});

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            console.log(token);
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default request;
