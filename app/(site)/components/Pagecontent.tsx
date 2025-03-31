"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps>  = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                Sem sons.
            </div>
        )
    }
    return ( 
        <div className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            2xl:grid-cols-8 
            gap-6 
            p-4
            rounded-lg
            bg-gradient-to-b from-black via-purple-900/5 to-black
            backdrop-blur-sm
        ">
            {songs.map((item) => (
                <div key={item.id} className="
                    relative
                    group
                    bg-neutral-900/80
                    backdrop-blur-sm
                    rounded-lg
                    transition
                    duration-300
                    hover:shadow-purple-500/30
                    hover:shadow-lg
                ">
                    <SongItem onClick={(id: string) => onPlay(id)} data={item} />
                </div>
            ))}
        </div>
     );
}
 
export default PageContent;