"use client"

import { useEffect, useState } from "react";
import { apiBaseURL } from "@/constants";
import { useRouter } from "next/navigation";
import blogService from "@/services/blog.service";
import toast from "react-hot-toast";


export default function AddBlogPage({ params }) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [submitError, setSubmitError] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        content: "",
    });

    useEffect(() => {
        blogService.getBlog(params.blogId)
        .then((res) => setFormData({title: res.data.blog.title, content: res.data.blog.content, image: `${apiBaseURL}/images/${res.data.blog.imageUrl}`}))
        .catch((error) => setError(error))
        .finally(() => {
            setLoading(false);
        })
    }, [])

    const imageChanges = (e) => {       
        setFormData({
            ...formData,
            image: e
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            
            setSubmitError("");
            setSubmitLoading(true);

            const updateData = {
                ...formData,
                image: typeof formData.image === 'string' ? null : formData.image,
                blogId: params.blogId
            }

            const response = await blogService.updateBlog(updateData);

            console.log('RESPONSE')

            if(response.status === 200) {

                toast.success(response.data.message, {position: 'bottom-right'});

                setFormData({
                    content: "",
                    title: "",
                    image: ""
                });

                router.push('/');
            }

        } catch (error) {
            console.log('ERROR: ',error);
            setSubmitError(error);
        }finally {
            setSubmitLoading(false);
        }
    }

    return (
        <>
            {
                loading && (
                    <div className="max-w-[1170px] mx-auto grid place-content-center mt-4 ">
                        <div className="bg-white rounded-lg sm:min-w-[500px] sm:min-h-[500px] p-3 grid place-content-center">
                            <div>
                                <h1 className="text-purple-900 font-bold text-4xl">Loading...</h1>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !loading && error !== '' && (
                    <div className="max-w-[1170px] mx-auto grid place-content-center mt-4 ">
                        <div className="bg-white rounded-lg sm:min-w-[500px] sm:min-h-[500px] p-3 grid place-content-center">
                            <div>
                                <h1 className="text-purple-900 font-bold text-4xl">Unable to get the Blog.</h1>
                                <div className="flex justify-center mt-4">
                                    <button 
                                    className="px-3 py-2 bg-purple-900 text-white text-lg rounded-md font-bold hover:bg-purple-700 duration-200">
                                    <Link href="/" >Go Back</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                formData.title !== "" && (
                    <div className="max-w-[1170px] mx-auto mt-4 pb-4 flex justify-center items-center">
                        <div className="bg-white mx-2 px-10 w-[450px] sm:min-w-[500px] rounded-lg py-4">
                            <div className="">
                                <h2 className="font-bold text-black/75 text-2xl">Edit Blog</h2>
                                <div className="mt-4">
                                    {
                                        submitError && (
                                            <div className="px-1.5 py-1.5 my-2 bg-red-500 text-white w-full rounded ">
                                                {submitError}
                                            </div>  
                                        )
                                    }
                                    <form onSubmit={submitForm}>
                                        <div className="col-span-full">
                                            <label htmlFor="cover-photo" className= "text-sm font-medium leading-6 text-gray-900">
                                                Cover photo
                                            </label>
                                            {
                                                typeof formData.image === 'string' && formData.image.startsWith(apiBaseURL) && (
                                                    <div className="flex justify-center my-2">
                                                        <img className="h-[200px]" src={formData.image} alt="" />
                                                    </div>
                                                )
                                            }
                                            {
                                                typeof formData.image !== 'string' && (
                                                    <div className="flex justify-center my-2">
                                                        <img className="h-[200px]" src={URL.createObjectURL(formData.image)} alt="" />
                                                    </div>
                                                )
                                            }
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                <div className="text-center">
                                                    {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>Upload blog image</span>
                                                            <input 
                                                                onChange={(e) => imageChanges(e.target.files[0])}
                                                                id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        </label>
                                                        {/* <p className="pl-1">or drag and drop</p> */}
                                                    </div>
                                                    {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="my-2">
                                            <label className="text-md text-black ">
                                                Title
                                            </label>
                                            <input
                                                value={formData.title}
                                                onChange={(e) => setFormData((prev) => {return {...prev, title: e.target.value}})}
                                                type="text"
                                                placeholder="My Blog"
                                                required={true}
                                                className="mt-2 text-black text-md w-full py-1.5 px-1.5 border-gray-600 border-[1px] rounded" />
                                        </div>
                                        <div className="mb-2">
                                            <label className="text-md text-black ">
                                                Description
                                            </label>
                                            <textarea
                                                value={formData.content}
                                                onChange={(e) => setFormData((prev) => {return {...prev, content: e.target.value}})}
                                                type="text"
                                                placeholder="Type description"
                                                maxLength={2000}
                                                required={true}
                                                className="mt-2 text-black text-md w-full py-1.5 px-1.5 border-gray-600 border-[1px] rounded" />
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                disabled={loading ? true : false}
                                                className="bg-purple-900 rounded-lg w-full text-white py-1.5 hover:bg-purple-700"
                                            >
                                                {
                                                    submitLoading ? (
                                                        <div className="text-center" role="status">
                                                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                            </svg>
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    ) : <p>Save</p>
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
}