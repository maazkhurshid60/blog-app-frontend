import { apiBaseURL } from "@/constants";
import axios, { AxiosError } from "axios";


class UserService {


    async getUserDetails(userId) {
        try {

            const token = localStorage.getItem('token');

            const response = await axios.get(apiBaseURL + '/api/user/details', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                params: {
                    userId
                }
            });

            if(response.status === 200){

                return response;
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

    async followUnfollowUser(userId) {
        try {

            const token = localStorage.getItem('token');

            const response = await axios.patch(apiBaseURL + '/api/user/follow-unfollow-user',
            {
                userId
            },
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
            });

            if(response.status === 200){

                return response;
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

}


const userService = new UserService();

export default userService;