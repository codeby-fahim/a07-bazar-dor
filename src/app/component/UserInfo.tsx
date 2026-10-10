'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { Bounce, toast } from 'react-toastify';

const UserInfo = () => {
  const {data: session} = authClient.useSession();
  const user = session?.user;

  const handleSignOut= async()=>{
    await authClient.signOut();
    toast.success("Successfully Sign Out", {
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
  return (
    <div >

      {user ? (
        <div className='flex gap-2 items-center font-bold text-blue-600 text-2xl'>
          <h2>স্বাগতম,{user?.name}</h2>
          <Link href='/profile'><button className='btn rounded-xl bg-blue-600 text-white'>My Profile</button></Link>
          <button className='btn bg-green-600 text-white rounded-xl' onClick={handleSignOut}>সাইন আউট</button>
        </div>
      ): (
        <div className="flex gap-2">
          <Link href='/sign-in'>
          <button className="btn bg-gray-300 rounded-xl">সাইন ইন</button>
          </Link>
          <Link href='/sign-up'>
          <button className="btn bg-green-600 text-white rounded-xl">সাইন আপ</button>
          </Link>
        </div>
      )};
      
    </div>
  );
};

export default UserInfo;