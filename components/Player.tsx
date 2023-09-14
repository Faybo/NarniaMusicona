"use client";

import useGetsongByID from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetsongByID(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }


    return (
        <div className="fixed bottom-0 w-full py-2 h-[80px] px-4 bg-gradient-to-t bg-black">
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>

      );
}
 
export default Player;