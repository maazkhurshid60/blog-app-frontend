"use client"
import { useRouter } from "next/navigation";

export default function SignupButton() {

    const router = useRouter();

    const toSignUp = () => {
        router.push("/signup");
    }
    return (
        <button 
        onClick={toSignUp}
        className="px-3 py-2 bg-purple-900 text-white text-lg rounded-md font-bold hover:bg-purple-700 duration-200">
           Join Now
        </button>
    );
}