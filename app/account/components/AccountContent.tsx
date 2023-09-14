"use client";
import { useEffect, useState } from 'react';
import MediaItem from '@/components/MediaItem';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AccountContent = () => {
  const [userSong, setUserSong] = useState<Song[]>([]);
  const [newUsername, setNewUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const onPlay = useOnPlay(userSong);
  const router = useRouter();

  useEffect(() => {
    const fetchUserSongs = async () => {
      try {
        if (!user) {
          return;
        }

        const { data, error } = await supabaseClient
          .from('songs')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setUserSong(data || []);
      } catch (error) {
        console.error('Erro ao buscar músicas do usuário:', error);
      }
    };

    fetchUserSongs();
  }, [user]);

  const handleRemoveSong = async (id: string) => {
    try {
      const { error } = await supabaseClient.from('songs').delete().eq('id', id);
  
      if (error) {
        throw error;
      }
  
      // Exiba uma notificação de sucesso
      toast.success('Música removida com sucesso!', {
        position: 'top-right',
      });
    } catch (error) {
      console.error('Erro ao remover música:', error);
  
      // Exiba uma notificação de erro
      toast.error('Erro ao remover música.', {
        position: 'top-right',
      });
    }
  };

  const handleUpdateUsername = async () => {
    if (!newUsername) {
      setError("Por favor, insira um novo nome de usuário.");
      return;
    } else {
      toast.success("Nome de usuário aceite.")
      router.push('/');
      router.refresh();
    }

    // Verificar se o novo nome de usuário é único (por exemplo, fazendo uma consulta à base de dados)
    const { data, error } = await supabaseClient
      .from("users")
      .select("id")
      .eq("username", newUsername);

    if (error) {
      setError("Ocorreu um erro ao verificar o nome de usuário.");
      return;
    }

    if (data && data.length > 0) {
      setError("Nome de usuário já está em uso. Por favor, escolha outro.");
      return;
    }

    // Atualizar o nome de usuário na base de dados
    const { error: updateError } = await supabaseClient
      .from("users")
      .update({ username: newUsername })
      .eq("id", user?.id); // Certifique-se de verificar se 'user' não é nulo

    if (updateError) {
      setError("Ocorreu um erro ao atualizar o nome de usuário.");
      return;
    }

    // Limpe quaisquer erros anteriores e redefina o campo de entrada
    setError("");
    setNewUsername("");
  };

  return (
    <div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Atualiza o Teu Nome de Artista</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Insira seu novo nome de Artista"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="border shadow-neon-red p-1 rounded-md focus:outline-none"
          />
          <button onClick={handleUpdateUsername} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none">
            Atualizar
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      <h1 className="text-4xl font-semibold text-center color-changing-title">
        Tuas Músicas:
      </h1>
      <ul>
        {userSong.map((song) => (
          <li key={song.id} onClick={() => onPlay(song.id)} className="flex items-center gap-4 w-full">
            <MediaItem data={song} />
            <button
              onClick={() => handleRemoveSong(song.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      </div>
      <style jsx>{`
        @keyframes changeColor {
          0% {
            color: red;
          }
          50% {
            color: blue;
          }
          100% {
            color: red;
          }
        }

        .color-changing-title {
          animation: changeColor 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AccountContent;
