"use client"

import { useState, useEffect } from "react";
import blogService from "@/services/blog.service";
import {apiBaseURL} from '@/constants'
import Link from "next/link";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function BlogPage({ params }) {

    const router = useRouter();

    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [cmtAddLoading, setCmtAddLoading] = useState(false);
    const [error, setError] = useState("");
    const [cmtError, setCmtError] = useState("");
    const user = useSelector(state => state.auth.user);

    const [comment, setComment] = useState('');
    const [cmtLoading, setCmtLoading] = useState(true);

    const [delBlgLoading, setDelBlgLoading] = useState(false);

    useEffect(() => {
        const blogId = params.blogId;

        blogService.getBlog(blogId)
        .then((data) => setData(data.data.blog))
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setLoading(false);
        })

    }, []);

    useEffect(() => {
        const blogId = params.blogId;

        blogService.getAllBlogComments(blogId)
        .then((res) => setComments(res.data.comments))
        .catch((error) => setCmtError(error))
        .finally(() => {
            setCmtLoading(false);
        })
    }, []);

    const likeBlog = async () => {

        const blogDislikes = data.disLikes;
        const blogLikes = data.likes;

        const userPresentInDislikes = blogDislikes.find((li) => li === user._id);

        if(userPresentInDislikes) {
            blogDislikes.pop(user._id);
        }

        const userPresentInLikeAlready = blogLikes.find((li) => li === user._id);

        if(userPresentInLikeAlready) {
            blogLikes.pop(user._id);
            toast.success('Blog Un-Liked', {position: "bottom-right"});
        } else {
            blogLikes.push(user._id);
            toast.success('Blog Liked', {position: "bottom-right"});
        }

        setData((prev) => {return {...prev, likes: blogLikes, disLikes: blogDislikes}});

        try {
            await blogService.likeBlog(data._id);
        } catch (error) {
            console.log(error);
        }

    }

    const dislikeBlog = async () => {

        const blogDislikes = data.disLikes;
        const blogLikes = data.likes;

        const userPresentInLikes = blogLikes.find((li) => li === user._id);

        if(userPresentInLikes) {
            blogLikes.pop(user._id);
        }

        const userPresentInDisLikeAlready = blogDislikes.find((li) => li === user._id);

        if(userPresentInDisLikeAlready) {
            blogDislikes.pop(user._id);
            toast.success('Blog Un-Disliked', {position: "bottom-right"});
        } else {
            blogDislikes.push(user._id);
            toast.success('Blog Disliked', {position: "bottom-right"});
        }

        setData((prev) => {return {...prev, likes: blogLikes, disLikes: blogDislikes}});

        try {
            await blogService.dislikeBlog(data._id);
        } catch (error) {
            console.log(error);
        }

    }

    const addComment = async () => {
        try {
            setCmtAddLoading(true);
            const response = await blogService.addBlogComment(data._id, comment);

            if(response.status === 201) {
                const cmt = response.data.comment;
                cmt.createdBy = user;
                comments.push(cmt);
                setComments(comments);
                toast.success('Comment Added Successfully');
            }
            
        } catch (error) {
            console.log(error);
            toast.error('Comment Failed');
        } finally {
            setCmtAddLoading(false);
        }
    }

    const deleteBlog = async () => {
        try {
            setDelBlgLoading(true);

            const response = await blogService.deleteBlog(params.blogId);

            if(response.status === 200) {

                toast.success(response.data.message);

                router.push('/');

            }
            
        } catch (error) {
            
            toast.error(error);

        } finally {
            setDelBlgLoading(false);
        }
    }

    const editBlog = () => {
        router.push(`/blog/${params.blogId}/edit`);
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
                    data && (
                        <div className="max-w-[1170px] h-full lg:mx-auto mb-4 mx-2 mt-4 pb-4 px-2 py-2 rounded-md bg-white">
                        {
                            data.createdBy._id === user._id && (
                                <div className="flex justify-between mb-4">
                                    <h1 className="font-bold text-4xl">Blog</h1>
                                    <div className="flex items-center gap-4">
                                        <Link 
                                            href={`/blog/${params.blogId}/edit`}
                                            className="px-3 py-2 bg-purple-900 text-white text-lg rounded-md font-bold hover:bg-purple-700 duration-200">
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={deleteBlog}
                                            className="px-3 py-2 bg-red-900 text-white text-lg rounded-md font-bold hover:bg-red-700 duration-200">
                                            {
                                                delBlgLoading ? (
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                ) : <>Delete</>
                                            }
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            data.createdBy._id !== user._id && <h1 className="font-bold text-4xl mb-4">Blog</h1>
                        }
                        <div className="bg-contain flex justify-center">
                            <img className="w-[50%] rounded border-2 border-purple-900 group-hover:border-white" src={`${apiBaseURL}/images/${data.imageUrl}`} />
                        </div>
                        <div className="flex flex-col items-center mt-2 overflow-hidden">
                            <div className="font-bold text-2xl text-black">
                                <h1>{data.title}</h1>
                            </div>
                            <div className="font-bold text-md text-black">
                                <h1>Created By: <Link href={`/profile/${data.createdBy._id}`} className="text-purple-600 font-bold text-xl">{data.createdBy.fullname}{` ${data.createdBy.username === user.username ? '(You)' : ''}`}</Link></h1>
                            </div>
                        </div>
                        <div className=" max-w-[700px] mx-auto text-justify font-normal text-sm text-black mt-2 flex flex-wrap">
                            {data.content}
                        </div>
                        <div className="flex flex-cols justify-center items-center mt-3 p-2">
                            <div onClick={likeBlog} className="flex items-center mr-2">
                                <div className="px-1.5 py-1.5 text-center bg-purple-700 text-white rounded-full min-w-[70px] hover:cursor-pointer hover:bg-purple-800">
                                Like {' '} {data.likes.length}
                                </div>
                                
                            </div>
                            <div  onClick={dislikeBlog} className="flex items-center">
                                <div className="px-1.5 py-1.5 text-center bg-red-700 text-white rounded-full min-w-[70px] hover:cursor-pointer hover:bg-red-800">
                                    Dislike {' '} {data.disLikes.length}
                                </div>
                            </div>
                        </div>

                        <div className="max-w-[700px] min-h-[500px] mx-auto text-justify items-center mt-3 p-2 ">
                            <div className="font-bold text-2xl">Comments {` (${comments.length})`}</div>
                            <div className="max-h-[700px] overflow-y-scroll">
                                {
                                    cmtLoading && <p className="font-bold text-xl text-center">Loading...</p>
                                }
                                {
                                    !cmtLoading && <div className={`${comments.length > 0 ? 'min-h-[300px]' : "min-h-[100px]"} p-4`}>

                                        {
                                            !cmtError && (
                                                <ul>
                                                {
                                                    comments.length > 0 ? (
                                                        comments.map((cmt) => (
                                                            <li key={cmt._id} className="mt-2"> 
                                                                <div className="w-full my-2 flex gap-5 items-start">
                                                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-purple-900 rounded-full dark:bg-purple-600">
                                                                        <span className="font-medium text-white dark:text-white">{cmt.createdBy.username[0]+cmt.createdBy.username[1]}</span>
                                                                    </div>
                                                                    <div className="flex flex-col justify-start">
                                                                        <div className="font-semibold text-lg text-black">{cmt.createdBy.fullname}</div>
                                                                        <div className="text-md">
                                                                            {cmt.comment}
                                                                        </div>
                                                                        {/* <div className="mt-2 w-[500px] flex justify-end gap-4">
                                                                            <div className="py-1 px-2.5 bg-purple-900 text-white rounded hover:bg-purple-700 hover:cursor-pointer">
                                                                                Like {` ${cmt.likes.length}`}
                                                                            </div>
                                                                            <div className="py-1 px-2.5 bg-purple-900 text-white rounded hover:bg-purple-700 hover:cursor-pointer">
                                                                                Reply
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    ) : <p className="font-bold text-xl text-center">No Comments</p>
                                                }
                                                </ul>
                                            )
                                        } 
                                        {
                                            cmtError && (
                                                <p className="font-bold text-xl text-center">{cmtError}</p>
                                            )
                                        }

                                    </div>
                                }

                            </div>
                            <hr className="text-black " />
                            <div className="mt-2 font-semibold text-black text-xl">
                                Write Comment
                            </div>
                            <div>
                                <textarea 
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Very interesting..."
                                    maxLength={500}
                                    rows={4}
                                    required={true}
                                    className="mt-2 text-black text-md w-full py-1.5 px-1.5 border-gray-600 border-[1px] rounded"
                                />
                                <div className=" flex justify-end w-full">
                                    <button 
                                        onClick={addComment}
                                        disabled={ cmtAddLoading || comment.length === 0 ? true: false}
                                        className={`px-3 py-2 ${comment.length === 0 ? 'bg-purple-300' : 'bg-purple-900'} text-white text-lg rounded-md font-bold ${comment.length === 0 ? '' : 'hover:bg-purple-700'} duration-200 ${cmtAddLoading ? 'cursor-progress' : 'cursor-pointer'}`}>
                                        {
                                            cmtAddLoading ? (
                                                <div role="status">
                                                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : <>Comment</>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}