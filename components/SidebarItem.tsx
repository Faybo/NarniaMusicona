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
                transition-all
                duration-300
                text-neutral-400 
                py-2
                px-3
                hover:text-purple-400
                group
                `,
                active && "text-purple-400"
            )}
        >
            <Icon size={20} className="transition-transform group-hover:scale-110"/>
            <p className="truncate w-full">{label}</p>
        </Link>
    );
}
 
export default SidebarItem;