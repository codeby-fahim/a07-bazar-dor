

'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
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
        
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!", {
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
    <div className="min-h-screen bg-[#f4f5f6] py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
              {user?.image ? (
                <Image src={user.image} alt={user.name || 'User'} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#008236] text-white font-bold text-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">{user?.name || 'নাম পাওয়া যায়নি'}</h2>
              <p className="text-sm text-gray-500">{user?.email || 'email@example.com'}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="border border-rose-200 text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            ← সাইন আউট
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="input input-bordered w-full bg-white border-gray-200 text-gray-800 focus:outline-none focus:border-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full btn bg-[#008236] hover:bg-[#006b2c] text-white border-none py-2.5 rounded-xl font-medium transition-colors"
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