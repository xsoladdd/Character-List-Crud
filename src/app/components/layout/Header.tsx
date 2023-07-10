import React from "react";
import NavItem from "./NavItem";

const Header: React.FC = () => {
  return (
    <>
      <header className="py-5 flex px-24 w-full justify-between">
        <h1 className="text-2xl font-bold text-primary uppercase ">
          Character List
        </h1>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <NavItem href={"/"} title="Home" />
        {/* <NavItem href={"/CreateRecord"} title="Create Record"/> */}
        {/* <NavItem /> */}
        </nav>
      </header>
    </>
  );
};
export default Header;
