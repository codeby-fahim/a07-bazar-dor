


import Image from "next/image";

import NavLink from "./NavLink";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="logo"
            height={40}
            width={40}
            className="p-2 sm:p-3 bg-green-600 rounded-xl w-10 sm:w-12 h-10 sm:h-12 object-contain"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">বাজার দর</h2>
            
          </div>
        </div>
        
        <UserInfo />
      </div>
      <NavLink />
    </header>
  );
};

export default Header;
