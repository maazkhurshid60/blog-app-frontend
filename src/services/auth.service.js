import axios, { AxiosError } from 'axios'
import {apiBaseURL} from '@/constants'

class AuthService {


    async signup({fullname, username, email, password}) {

        try {

            if((fullname === undefined || fullname === null || fullname == '') ||
            (username === undefined || username === null || username === '') ||
            (email === undefined || email === null || email === '') ||
            (password === undefined || password === null || password === '')) {
                throw new Error('Required fields are empty');
            }

            if(typeof fullname !== 'string' || typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
                throw new Error('Invalid Data types')
            }

            const response = await axios.post(apiBaseURL + '/api/auth/signup', {
                fullname,
                username,
                email,
                password
            });

            if(response.status === 201){
                return response;
            }
            
        } catch (error) {
            if(typeof error === AxiosError) {
                throw error.response.data.error;
            } else {
                throw error.message;
            }
        }

    }

    async login({content, password}) {

        try {

            if((content === undefined || content === null || content === '') ||
            (password === undefined || password === null || password === '')) {
                throw new Error('Required fields are empty');
            }

            if(typeof content !== 'string' || typeof password !== 'string') {
                throw new Error('Invalid Data types')
            }

            const response = await axios.post(apiBaseURL + '/api/auth/login', {
                content,
                password
            });

            if(response.status === 200){
                
                const data = response.data;

                const token = data.token

                localStorage.setItem('token', token);

                return data;
            }
            
        } catch (error) {
            if(typeof error === AxiosError) {
                throw error.response.data.error;
            } else if(error.response) {
                throw error.response.data.error;
            } else {
                throw error.message;
            }
        }

    }

    async logout() {
        try {

            const token = localStorage.getItem('token');

            const response = await axios.get(apiBaseURL + '/api/auth/logout', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            if(response.status === 200){

                localStorage.removeItem('token');

                return response;
            }
            
        } catch (error) {
            if(typeof error === AxiosError) {
                throw error.response.data.error;
            } else {
                throw error.message;
            }
        }
    }


}


const authService = new AuthService();

export default authService;