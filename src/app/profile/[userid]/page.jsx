"use client"

import { useEffect, useState } from "react";
import userService from "@/services/user.service";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { followUnfollowUser } from '@/app/store/authSlice'

export default function ProfilePage({ params }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        userService.getUserDetails(params.userid)
        .then((res) => {
            if(res.status === 200) {
                setUserData(res.data.user);
            }
        })
        .catch((error) => setError(error))
        .finally(() => {
            setLoading(false);
        })

    }, []);

    const followUser = async () => {
        try {
            
            const response = await userService.followUnfollowUser(params.userid);

            if(response.status === 200) {

                dispatch(followUnfollowUser(params.userid));

                toast.success(response.data.message);

            }

        } catch (error) {
            toast.error(error);
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
                                <h1 className="text-purple-900 font-bold text-4xl">{error}</h1>
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
            !loading && error === '' && (
                <div className="max-w-[1170px] mx-auto mt-4 pb-4 flex justify-center items-center">
                    <div className="bg-white px-10 sm:w-[500px] w-[90%]  rounded-lg py-4">
                        <div>
                            <h2 className="font-bold text-black/75 text-2xl">Profile</h2>
                            <div className="mt-4 flex justify-center">
                                <div className=" w-20 h-20 rounded-full text-white bg-purple-900 flex justify-center items-center hover:bg-purple-600 duration-200 text-2xl">
                                    <h1>{userData.fullname[0]}</h1>
                                </div>
                            </div>
                            <div className="my-4 flex justify-center">
                                <div className="flex-col text-center">
                                    <h1 className="text-purple-600 font-bold text-2xl">{userData.fullname}</h1>
                                    <h2 className="mt-2 text-gray-400 text-sm">@{userData.username}</h2>
                                </div>
                            </div>
                            <div className="my-4 flex justify-center gap-4">
                                {
                                    user._id !== params.userid && (
                                        <>
                                            {
                                                user.followings.find((u) => u.userId === params.userid) ? (
                                                    <div onClick={followUser} className="px-3 py-2 border-2 border-purple-900  text-purple-900 text-lg rounded-md font-bold duration-200 cursor-pointer">
                                                        Unfollow
                                                    </div>
                                                    
                                                ) : (
                                                    <div onClick={followUser} className="px-3 py-2 bg-purple-900 text-white text-lg rounded-md font-bold hover:bg-purple-700 duration-200 cursor-pointer">
                                                        Follow
                                                    </div>
                                                )
                                            }
                                            {
                                                userData.followings.find((u) => u.userId === user._id) && (
                                                    <div className="px-3 py-2 border-2 border-purple-900  text-purple-900 text-lg rounded-md font-bold">
                                                        Follows You
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>
                            <hr />
                            <div className="my-4 flex justify-center">
                                <div className="flex justify-between items-center gap-20">
                                    <div className="flex-col text-center">
                                        <h1 className="text-black text-lg font-bold">Followers</h1>
                                        <h1 className="text-black text-sm font-bold">{userData.followers.length}</h1>
                                    </div>
                                    <div className="flex-col text-center">
                                        <h1 className="text-black text-lg font-bold">Followings</h1>
                                        <h1 className="text-black text-sm font-bold">{userData.followings.length}</h1>
                                    </div>
                                    
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            )
        }
        
        </>
    );
}