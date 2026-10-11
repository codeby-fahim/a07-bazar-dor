
'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

const SignUpPage = () => {

  const onSubmit = async(e: React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault();
    const formData =  new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {name:string, email:string, password: string, confirmPassword: string};

    if(user.password !== user.confirmPassword){
      toast.error("Password not matching", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    const {data, error} = await authClient.signUp.email({
      ...user,
      callbackURL: "/"
    })
    if(data){
      toast.success("Successfully Logged In", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      redirect("/")
    }
    if(error){
      toast.error("Invalid Email and Password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  const handleGoogleSign= async()=>{
    const data = await authClient.signIn.social({
      provider: "google"
    });
    console.log(data);
  }

  const handleGithubSign= async()=>{
    const data = await authClient.signIn.social({
      provider: "github"
    })
    console.log(data);
  }
  return (
    <div className="flex justify-center items-center my-6 sm:my-10 px-3 sm:px-4 font-sans">
      <div className="w-full max-w-md">
        <h3 className="text-xl sm:text-2xl text-center font-bold text-gray-800">অ্যাকাউন্ট তৈরি করুন</h3>
        <p className="text-center text-gray-500 text-xs sm:text-sm mt-1 px-2">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        
        <form onSubmit={onSubmit} className="mt-6">
          <fieldset className="fieldset border-base-300 rounded-2xl w-full border p-4 sm:p-6 bg-white shadow-sm">
            
            <label className="label text-gray-700 font-medium text-xs sm:text-sm">নাম</label>
            <input name="name" type="text" className="input input-bordered w-full mt-1 mb-3 text-sm" placeholder="যেমন: রহিম উদ্দিন" />

            <label className="label text-gray-700 font-medium text-xs sm:text-sm">ইমেইল</label>
            <input name="email" type="email" className="input input-bordered w-full mt-1 mb-3 text-sm" placeholder="you@example.com" />

            <label className="label text-gray-700 font-medium text-xs sm:text-sm">পাসওয়ার্ড</label>
            <input name="password" type="password" className="input input-bordered w-full mt-1 mb-3 text-sm" placeholder="কমপক্ষে ৮ অক্ষর" />

            <label className="label text-gray-700 font-medium text-xs sm:text-sm">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input name="confirmPassword" type="password" className="input input-bordered w-full mt-1 mb-4 text-sm" placeholder="আবার লিখুন" />

            <button type="submit" className="btn bg-[#008236] hover:bg-[#006b2c] text-white w-full border-none text-sm">
              অ্যাকাউন্ট তৈরি করুন
            </button>

            <div className="flex items-center my-4">
              <div className="grow border-t border-gray-200"></div>
              <span className="px-3 text-gray-400 text-xs">অথবা</span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button onClick={handleGoogleSign} type="button" className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-normal">
               <FaGoogle />
                Google দিয়ে চালিয়ে যান
              </button>

              <button onClick={handleGithubSign} type="button" className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-normal">
                <FaGithub />
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <div className="text-center mt-4 text-xs sm:text-sm text-gray-600">
              অ্যাকাউন্ট আছে? 
              <Link href="/sign-in" className="text-[#008236] font-medium hover:underline ml-1">সাইন ইন করুন</Link>
            </div>

          </fieldset>
        </form>

        <div className="text-center mt-4">
          
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
          ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
