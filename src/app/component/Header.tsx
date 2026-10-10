import Image from "next/image";
import React from "react";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto p-5 flex justify-between">
        <div className="flex gap-2">
          <Image
            src="/logo-icon.png"
            alt="logo"
            height={50}
            width={50}
            className="p-3 bg-green-600 rounded-xl"
          ></Image>
          <div>
            <h2 className="text-2xl font-bold">বাজার দর</h2>
            <p></p>
          </div>
        </div>
        <div>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-success">Success</button>
        </div>
      </div>
      <NavLink></NavLink>
    </header>
  );
};

export default Header;
