import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id || id === 'undefined') {
      setSong(undefined);
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('songs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setIsLoading(false);
          return;
        }
        
        setSong(data as Song);
      } catch (error) {
        console.error('Error fetching song:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song]);
};

export default useGetSongById;