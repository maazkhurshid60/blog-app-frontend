"use client"
import Link from "next/link";
import {SignupButton, LogoutButton} from '@/components/index'
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";

// const routes = [
//     {
//         id: 0,
//         routeName: 'Home',
//         path: '/',
//         authentication: false,
//     },
//     {
//         id: 1,
//         routeName: 'Add Blog',
//         path: '/add-blog',
//         authentication: true,
//     },
//     {
//         id: 2,
//         routeName: 'Profile',
//         path: '/',
//         authentication: true,
//     }
// ]

export default function Navigation() {

    const router = useRouter();
    const pathName = usePathname();
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
    const auth = useSelector(state => state.auth);

    const toggleMobileNav = () => {
        if(isMobileNavVisible) {
            setIsMobileNavVisible(false);
        } else {
            setIsMobileNavVisible(true);
        }
    }

    const navigateTO = (link) => {
        router.push(link);
        toggleMobileNav();
    }

    return (
        <>
            <div className="w-full h-14 bg-white border-b-2 border-black flex justify-between items-center px-3">
                <div>
                    <h2 className="text-purple-900 font-bold text-xl " > <Link href="/" >My Blog</Link> </h2>
                </div>
                

                <ul className="hidden md:flex justify-between gap-9 ">
                    <li className={`hover:text-purple-700 duration-200 ${pathName === '/' ? 'text-purple-700' : ""}`}><Link href="/">Home</Link></li>
                    <li className={`hover:text-purple-700 duration-200 ${pathName === '#' ? 'text-purple-700' : ""}`}><Link href="/">Career</Link></li>
                    <li className={`hover:text-purple-700 duration-200 ${pathName === '#' ? 'text-purple-700' : ""}`}><Link href="/">About Us</Link></li>
                    {
                        auth.isAuthenticated && (
                            <>
                                <li className={`hover:text-purple-700 duration-200 ${pathName === '/add-blog' ? 'text-purple-700' : ""}`}><Link href="/add-blog">Add Blog</Link></li>
                                <li className={`hover:text-purple-700 duration-200 ${pathName === '/profile' ? 'text-purple-700' : ""}`}><Link href={`/profile/${auth.user._id}`}>Profile</Link></li>
                            </>
                        )
                    }
                        {/* {
                            routes.map(route => (
                                <li key={route.id} className={`hover:text-purple-700 duration-200 ${pathName === '/add-blog' ? 'active' : ""}`}><Link href={`${route.path}`}>{route.routeName}</Link></li>
                            ))
                        } */}
                </ul>

                {
                    !auth.isAuthenticated && (
                        <div className="hidden md:flex items-center gap-5">
                            <button className="bg-transparent font-bold text-purple-900 hover:text-purple-700 duration-200">
                                    <Link href="/login">Login</Link>
                            </button>
                            <SignupButton />
                        </div>
                    )
                }
                {
                    auth.isAuthenticated && <div className="hidden md:flex gap-5">
                        {
                            auth.isAuthenticated && (
                                <div className="w-10 h-10 rounded-full bg-purple-900 flex justify-center items-center text-white font-bold text-xl">
                                    {auth.user.username[0]+auth.user.username[1]} 
                                </div>
                            )
                        }
                        {
                            auth.isAuthenticated && (
                                <LogoutButton />
                            )
                        }
                    </div>
                }
                <div onClick={toggleMobileNav} className=" md:hidden w-10 h-10 rounded-lg flex justify-center items-center text-white bg-purple-900 hover:bg-purple-700 duration-200 cursor-pointer">
                    M
                </div>
            </div>
            {
                isMobileNavVisible && (
                    <div className=" md:hidden w-full">
                        <div onClick={() => navigateTO('/')} className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                            Home
                        </div>
                        <div onClick={() => navigateTO('#')} className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                            Career
                        </div>
                        <div onClick={() => navigateTO('#')} className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                            About Us
                        </div>
                        {
                            auth.isAuthenticated && (
                                <div onClick={() => navigateTO('/add-blog')} className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                                    Add Blog
                                </div>
                            )
                        }
                        {
                            auth.isAuthenticated && (
                                <div onClick={() => navigateTO(`/profile/${auth.user._id}`)} className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                                    Profile
                                </div>
                            )
                        }
                        {
                            !auth.isAuthenticated && (
                                <>
                                    <div onClick={() => navigateTO('/login')} className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                                        Login
                                    </div>
                                    <div onClick={() => navigateTO('/signup')} className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                                        Join Now
                                    </div>
                                
                                </>
                            )
                        }
                        {
                            auth.isAuthenticated && (
                                <>
                                    <div className=" h-10 w-full bg-purple-400 text-white items-center flex px-4 text-lg hover:bg-purple-700 duration-200 cursor-pointer">
                                        <LogoutButton />
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            }
            
        </>
    );

}