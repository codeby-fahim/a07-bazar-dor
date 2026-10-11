
'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
      redirect('/sign-in')
  }
  return (
    <div>

      {user ? (
        <div className='flex flex-wrap items-center justify-end gap-2 sm:gap-3 font-bold text-blue-600 text-sm sm:text-lg md:text-xl'>
          <h2 className="truncate max-w-30 sm:max-w-50">স্বাগতম, {user?.name}</h2>
          <Link href='/profile'>
            <button className='btn btn-sm sm:btn-md rounded-xl bg-blue-600 text-white font-normal text-xs sm:text-sm'>My Profile</button>
          </Link>
          <button className='btn btn-sm sm:btn-md bg-green-600 text-white rounded-xl font-normal text-xs sm:text-sm' onClick={handleSignOut}>সাইন আউট</button>
        </div>
      ): (
        <div className="flex items-center gap-2">
          <Link href='/sign-in'>
            <button className="btn btn-sm sm:btn-md bg-gray-300 rounded-xl font-normal text-xs sm:text-sm px-3 sm:px-4">সাইন ইন</button>
          </Link>
          <Link href='/sign-up'>
            <button className="btn btn-sm sm:btn-md bg-green-600 text-white rounded-xl font-normal text-xs sm:text-sm px-3 sm:px-4">সাইন আপ</button>
          </Link>
        </div>
      )}
      
    </div>
  );
};

export default UserInfo;