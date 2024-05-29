import axios from 'axios';

import { envGlobalVar } from '~/core/apolloClient'

const { revenueApiUrl } = envGlobalVar()

const revenueApiClient = axios.create({
  baseURL: revenueApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = useReactiveVar(authTokenVar);
//
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default revenueApiClient;
