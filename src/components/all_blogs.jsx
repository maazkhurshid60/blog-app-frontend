"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "@/services/blog.service";
import { setBlogData } from "@/app/store/blogSlice"

import {apiBaseURL} from '@/constants'

export default function AllBlogsComponent() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blog.blogs);

    useEffect(() => {
        blogService.fetchBlogs()
        .then((res) => {
            dispatch(setBlogData(res));
        })
        .catch((e) => {
            setError(e);
        }).finally(() => {
            setLoading(false);
        })

    }, [])

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
                                <h1 className="text-purple-900 font-bold text-4xl">Please Login</h1>
                                <div className="flex justify-center mt-4">
                                    <button 
                                    className="px-3 py-2 bg-purple-900 text-white text-lg rounded-md font-bold hover:bg-purple-700 duration-200">
                                    <Link href="/login" >Login</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !loading && error === '' && (
                    blogs.length > 0 ? (
                        <div className="h-full max-w-[1170px] mx-auto mt-4 pb-4 px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {
                                blogs.map((blog) => (
                                    <div key={blog._id}>
                                        <div className=" w-full md:max-w-sm p-2 bg-white border h-[100%] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                           <div className="h-[150px]">
                                            <Link className="flex justify-center items-center bg-contain" href={`/blog/${blog._id}`}>
                                                <img className="rounded-lg justify-center bg-cover" width={150}  src={`${apiBaseURL}/images/${blog.imageUrl}`} alt="" />
                                            </Link>
                                           </div>
                                            <div className="p-5 mt-2">
                                                <a href="#">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                                                </a>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">By: {blog.createdBy.fullname}</p>
                                                <Link href={`/blog/${blog._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Read more
                                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                        {/* <Link href={`/blog/${blog._id}`}>
                                            <div className="min-w-[200px] h-[300px] group p-2 rounded bg-white shadow-md flex flex-col items-start gap-2 hover:bg-purple-900 duration-200 overflow-hidden cursor-pointer">
                                                <div className="w-full h-[200px] bg-contain">
                                                    <img className="rounded border-2 border-purple-900 group-hover:border-white" src={`http://localhost:8000/images/${blog.imageUrl}`} />
                                                </div>
                                                <h2 className="text-black/75 font-bold text-2xl group-hover:text-white">{blog.title}</h2>
                                                <div className="mt-1">
                                                    <p className="w-full font-bold text-black/60 text-sm group-hover:text-white">By: {blog.createdBy.fullname}</p>
                                                </div>
                                            </div>
                                        </Link> */}
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        (
                            <div className="max-w-[1170px] mx-auto grid place-content-center mt-4 ">
                                <div className="bg-white rounded-lg sm:min-w-[500px] sm:min-h-[500px] p-3 grid place-content-center">
                                    <div>
                                        <h1 className="text-purple-900 font-bold text-4xl">No Blogs Yet</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                )
            }
        </>
    );
}

/*
<Link href="/blog/blog-1232">
                                <div className="min-w-[200px] group p-2 rounded bg-white shadow-md flex flex-col items-start gap-2 hover:bg-purple-900 duration-200 overflow-hidden cursor-pointer">
                                    <img className="h-[100] w-full rounded border-2 border-purple-900 group-hover:border-white" src="https://images.unsplash.com/photo-1698864273184-41cf2052196b?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                    <h2 className="text-black/75 font-bold text-2xl group-hover:text-white">Blog Title</h2>
                                    <div className="mt-1">
                                        <p className="w-full font-bold text-black/60 text-sm group-hover:text-white">By: Blog Owner</p>
                                    </div>
                                </div>
                            </Link>
*/