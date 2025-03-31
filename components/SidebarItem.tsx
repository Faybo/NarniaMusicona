import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, href}) => {
    return (
        <Link 
            href={href} 
            className={twMerge(`
                flex 
                flex-row 
                h-auto 
                items-center 
                w-full 
                gap-x-4 
                text-sm
                font-medium 
                cursor-pointer 
                transition 
                text-neutral-400 
                py-2
                px-3
                rounded-lg
                hover:bg-purple-900/20
                hover:text-white
                group
                relative
                `,
                active && "text-white bg-purple-900/30"
            )}
        >
            <Icon size={20} className="transition-transform group-hover:scale-110"/>
            <p className="truncate w-full">{label}</p>
            {active && (
                <div className="absolute left-0 top-0 h-full w-1 bg-purple-500 rounded-r-full"/>
            )}
        </Link>
    );
}
 
export default SidebarItem;