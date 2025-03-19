import axios, { AxiosError } from 'axios';
import getConfig from 'next/config';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const timeout =  30000;

/**
|--------------------------------------------------
| CUSTOM AXIOS
|--------------------------------------------------
*/

export interface AppAxiosConfig {
  headers: any;
}

let noAuthCount = 0;

export const appAxios = (config?: AppAxiosConfig) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: Number.parseInt(`${timeout}`),
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (configParam) => {
      const storedUserDetail = localStorage.getItem('auth');
      if (storedUserDetail) {
        const userDetail = JSON.parse(storedUserDetail);
        configParam.headers.Authorization = `Bearer ${userDetail.token}`;
      }
      console.log('Request Config:', configParam);
      console.log('Request Headers:', configParam.headers);
      return configParam;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401  ) {
        noAuthCount++;
        if (noAuthCount === 3) {
          toast.error('ไม่สามารถเข้าถึงข้อมูลได้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
          window.location.href = '/auth';
          localStorage.removeItem('auth');
          noAuthCount = 0; 
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};