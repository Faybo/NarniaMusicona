"use client";

import { HiHome } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Box from "./Box";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Início',
      active: pathname === '/',
      href: '/'
    }
  ], [pathname]);

  return (
    <div className="flex h-full">
      <div 
        className="
          hidden 
          md:flex 
          flex-col 
          gap-y-2 
          bg-gradient-to-b from-black via-purple-900/10 to-black
          h-full 
          w-[200px] 
          p-2
          fixed
          left-0
          top-0
          z-20
          border-r border-purple-900/20
        "
      >
        <div className="flex flex-col gap-y-4 px-3 py-2">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      </div>
      <main className="flex-1 h-full ml-0 md:ml-[200px] overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;