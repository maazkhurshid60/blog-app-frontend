import axios, { AxiosError } from 'axios'
import {apiBaseURL} from '@/constants'

class BlogService {

    async fetchBlogs() {

        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.get(apiBaseURL + '/api/blog/get-all-blogs', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            if(response.status === 200) {
                return response.data.blog;
            }
            
        } catch (error) {
            if(typeof error === AxiosError) {
                throw error.response.data.error;
            } else {
                throw error.message;
            }
        }

    }

    async addBlog({title, content, image}) {

        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.post(apiBaseURL + '/api/blog/add-blog', {
                title,
                content,
                image,
            }, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : `Bearer ${token}`
                }
            });

            if(response.status === 201) {
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

    async getBlog(blogId) {

        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.get(apiBaseURL + '/api/blog/get-blog',{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    blogId
                }
            });

            if(response.status === 200) {
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

    async likeBlog(blogId) {
        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.patch(apiBaseURL + '/api/blog/like',
            {
                blogId,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if(response.status === 200) {
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

    async dislikeBlog(blogId) {
        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.patch(apiBaseURL + '/api/blog/dislike',
            {
                blogId,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if(response.status === 200) {
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

    async getAllBlogComments(blogId) {
        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.get(apiBaseURL + '/api/blog/get-all-blog-comments',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    blogId
                }
            });

            if(response.status === 200) {
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

    async addBlogComment(blogId, comment) {
        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.post(apiBaseURL + '/api/blog/add-comment',
            {
                blogId,
                comment
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if(response.status === 201) {
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

    async deleteBlog(blogId) {

        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.delete(apiBaseURL + '/api/blog/delete-blog', {
                headers:{
                    'Authorization' : `Bearer ${token}`
                },
                params: {
                    blogId
                }
            });

            if(response.status === 200) {
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

    async updateBlog(data) {
        try {

            const token = localStorage.getItem('token');

            if(token === null) {
                throw new Error("No Token Found");
            }

            const response = await axios.patch(apiBaseURL + '/api/blog/update-blog', {...data}, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : `Bearer ${token}`
                }
            });

            if(response.status === 200) {
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


const blogService = new BlogService();

export default blogService;