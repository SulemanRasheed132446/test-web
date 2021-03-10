//Using React Router Inside Axios Interceptors

import axios from 'axios';
import history from './History';
import toaster from "toasted-notes";
import { notificationMsg } from './services/Constants'
import { NonAuthRoutes } from './router/Roles';

//Back end LDAP authentication project
export const baseAPIAuth = axios.create({
    baseURL: process.env.REACT_APP_AUTHEN_API_URL
});

//Back end Rest services project
export const baseAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

//Add a response interceptor
baseAPI.interceptors.response.use(undefined, error => {  
    const{ status, data, config } = error.response;
    if( status === 404 ){
        history.push(NonAuthRoutes.pageNoFound)
    }

    if( status === 404 && config.method === 'get' && data.errors.hasOwnProperty('id')){
        history.push(NonAuthRoutes.pageNoFound)
    }

    if( status === 500){
        toaster.notify('Server error', {
            position: 'top',
            duration: notificationMsg.duration
        });
    }

});

//Add a response interceptor
baseAPIAuth.interceptors.response.use(undefined, error => {  
        const{ status,data,config} = error.response;
        if( status === 404 ){
            toaster.notify('Server side Issues', {
                position: 'top',
                duration: notificationMsg.duration
            });
        }
    
        if( status === 404 && config.method === 'get' && data.errors.hasOwnProperty('id')){
            toaster.notify('Server side Issues', {
                position: 'top',
                duration: notificationMsg.duration
            });
        }
    
        if( status === 500){
            toaster.notify('Server error', {
                position: 'top',
                duration: notificationMsg.duration
            });
        }
    
    });