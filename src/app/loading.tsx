
export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">

      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center text-center">

        <div className="relative flex h-20 w-20 items-center justify-center">

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />

          <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 opacity-80 blur-xl" />

          <div className="absolute h-3 w-3 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50" />

        </div>

        <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl font-sans">
          লোড হচ্ছে
          <span className="inline-block animate-pulse text-blue-500">...</span>
        </h2>

        <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500 sm:text-base font-sans">
          দয়া করে একটু অপেক্ষা করুন, আমরা সবকিছু প্রস্তুত করছি।
        </p>

        <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
        </div>

      </div>
    </div>
  );
}