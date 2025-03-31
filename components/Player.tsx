"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { song, isLoading } = useGetSongById(player.activeId);
    
    // Só tenta carregar a URL se tivermos uma música válida
    const songUrl = song ? useLoadSongUrl(song) : null;

    // Não renderiza nada se não houver música ativa ou se estiver carregando
    if (!song || !songUrl || !player.activeId || isLoading) {
        return null;
    }

    return (
        <div className="
            fixed 
            bottom-0 
            w-full 
            py-2 
            h-[80px] 
            px-4 
            bg-gradient-to-r from-black via-purple-900/50 to-black 
            shadow-lg
            z-50
        ">
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
}

export default Player;