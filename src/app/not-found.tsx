


'use client'
import Link from "next/link";
import { FaArrowLeft, FaCompass } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden text-slate-950 px-6 py-16 bg-white font-sans">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-gray-200 bg-gray-50 shadow-lg">
          <FaCompass className="text-4xl text-blue-500" />
        </div>

        <h1 className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-[100px] sm:text-[140px] font-black leading-none tracking-tighter text-transparent">
          ৪০৪
        </h1>

        <h2 className="mt-6 text-2xl sm:text-4xl font-bold tracking-tight text-gray-800">
          উপস! পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm sm:text-base leading-7 text-gray-500">
          আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নেই অথবা সরিয়ে ফেলা হয়েছে। 
          চিন্তা করবেন না, চলুন আপনাকে সঠিক জায়গায় ফিরিয়ে নিয়ে যাওয়া যাক।
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 text-sm sm:text-base"
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            হোম পেজে ফিরে যান
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-gray-200 bg-gray-50 px-7 py-3.5 font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 text-sm sm:text-base w-full sm:w-auto"
          >
            আগের পেজে যান
          </button>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-6">
          <p className="text-xs sm:text-sm text-gray-400">
            ত্রুটি কোড: ৪০৪ <span className="mx-2">•</span> পেজ পাওয়া যায়নি
          </p>
        </div>
      </div>
    </main>
  );
}