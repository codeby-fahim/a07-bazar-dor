
import Image from 'next/image';

const Hero = () => {
  // const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-[#f8faf8] border border-gray-200/80 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        
        
        <div className="flex-1 space-y-4 text-left">
          <div className="inline-block bg-[#eaf3ed] text-[#1b733f] text-xs md:text-sm font-medium px-3.5 py-1.5 rounded-full">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬ 
            {/* {date} */}
          </div>

          
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <button className="bg-[#198754] hover:bg-[#157347] text-white font-medium text-sm md:text-base px-6 py-2.5 rounded-lg shadow-sm transition-colors duration-200">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-center">
          <Image
            src="/bazar-hero.png"
            alt="hero logo"
            height={300}
            width={300}
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;