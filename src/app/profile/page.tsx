
'use client';

import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { Bounce, toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || '');

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
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
              redirect("/sign-in")
            },
          },
        });
  };

  const handleUpdate = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    await authClient.updateUser({
      name: name,
    }, {
      onSuccess: () => {
        
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!", {
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
      },
    });
  };

  if (isPending) {
    return <div className="text-center my-20">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f5f6] py-6 sm:py-10 px-3 sm:px-4 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
              
                <div className="w-full h-full flex items-center justify-center bg-[#008236] text-white font-bold text-base sm:text-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-gray-800 text-base sm:text-lg truncate">{user?.name || 'নাম পাওয়া যায়নি'}</h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.email || 'email@example.com'}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="border border-rose-200 text-rose-600 hover:bg-rose-50 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-center"
          >
            ← সাইন আউট
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="input input-bordered w-full bg-white border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full btn bg-[#008236] hover:bg-[#006b2c] text-white border-none py-2.5 rounded-xl font-medium transition-colors text-sm"
            >
              আপডেট
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;