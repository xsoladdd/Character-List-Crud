"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { joinClass } from "@/utils/joinClass";

interface INavItemProps {
  href: string;
  title: string;
}

const NavItem: React.FC<INavItemProps> = ({ href, title }) => {

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <>
      {" "}
      <Link
        className={joinClass(
          "mr-5",
          isActive ? "text-gray-100 font-semibold" : "hover:text-gray-100"
        )}
        href={href}
      >
        {title}
      </Link>
    </>
  );
};
export default NavItem;
