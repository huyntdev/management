"use client";
import { sidebarLinks } from "../../constants/genaral.const";
import { TSidebarLink } from "../../types/general.types";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-grayEB px-4 py-6">
      {sidebarLinks.map((link) => (
        <SidebarLink
          isActive={pathname === link.path}
          key={link.title}
          link={link}
        ></SidebarLink>
      ))}
    </div>
  );
};

interface ISidebarLinkProps {
  link: TSidebarLink;
  isActive: boolean;
}

function SidebarLink({ link, isActive }: ISidebarLinkProps) {
  return (
    <>
      <Link
        key={link.title}
        to={link.path}
        className={`flex items-center px-6 py-4 text-[13px] font-medium gap-[10px]  rounded-xl ${
          isActive ? "bg-primary text-grayFC" : "hover:text-primary text-dark30"
        }`}
      >
        <span>{link.icon}</span>
        <span>{link.title}</span>
      </Link>
    </>
  );
}

export default Sidebar;
