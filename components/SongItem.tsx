"use client";

import useLoadImage from "@/hooks/UseLoadImage";
import { Song } from "@/types"
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void
};

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);

    return (
        <div 
            onClick={() => onClick(data.id)}
            className="
                relative 
                group 
                flex 
                flex-col 
                items-center 
                justify-center 
                rounded-md 
                overflow-hidden 
                gap-x-4 
                bg-neutral-400/5 
                cursor-pointer 
                transition 
                p-3
            "
        >
            <div className="
                relative 
                aspect-square 
                w-full 
                h-full 
                rounded-md 
                overflow-hidden
                group
            ">
                <Image 
                    className="
                        object-cover 
                        transition-all 
                        duration-500 
                        group-hover:scale-110 
                        group-hover:brightness-50
                    " 
                    src={imagePath ?? '/images/liked.png'} 
                    fill 
                    alt="Image"
                />
                <div className="
                    absolute 
                    inset-0 
                    flex 
                    items-center 
                    justify-center 
                    opacity-0 
                    group-hover:opacity-100 
                    transition-all 
                    duration-500
                ">
                    <div className="
                        transform 
                        translate-y-8 
                        group-hover:translate-y-0 
                        transition-all 
                        duration-500
                        bg-gradient-to-br 
                        from-purple-500 
                        to-purple-800
                        p-4 
                        rounded-full 
                        hover:scale-110
                        hover:from-purple-400
                        hover:to-purple-700
                        flex
                        items-center
                        justify-center
                        shadow-2xl
                        shadow-purple-500/50
                        group-hover:animate-pulse
                    ">
                        <BsFillPlayFill className="text-white text-4xl ml-1" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full group-hover:text-purple-400 transition duration-300">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm pb-4 w-full truncate group-hover:text-purple-300 transition duration-300">
                    {data.artist}
                </p>
            </div>
        </div>
    );
}
 
export default SongItem;