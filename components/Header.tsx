"use client";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";
import useUploadModal from "@/hooks/useUploadModal";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className,
}) => {
  const player = usePlayer();
  const router = useRouter();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const supabaseClient = useSupabaseClient();
  const { user, userDetails } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    }
  };

  const onClick = () => {
    if (!user) {
        return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  return (
    <div
      className={twMerge(`
        h-fit 
        bg-gradient-to-b 
        from-blue-900
        p-6
        `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button 
            onClick={() => router.push('/')} 
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button 
            onClick={() => router.push('/search')} 
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <div>
                <AiOutlinePlus
                  onClick={onClick}
                  size={30}
                  className="shadow-neon-red sm:opacity-0 lg:opacity-0 text-neutral-400 sm:cursor-pointer hover:text-white transition"
                />
              </div>
              <Button 
                onClick={handleLogout} 
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button 
                onClick={() => router.push('/account')} 
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
              
            </div>
          ) : (
            <>
              <div>
                <Button 
                  onClick={authModal.onOpen} 
                  className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button 
                  onClick={authModal.onOpen} 
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className=" sm:animate-bounce text-center text-white text-4xl font-semibold">
        Narnia Crib Music
      </div>
      <p className="text-center text-white sm:animate-ping font-semibold">Original Music Only</p>
      <div>
        {/* Verifique se o nome de artista está ausente e mostre a mensagem de aviso */}
        {user && !userDetails?.username && (
          <div className="flex items-center gap-x-2 text-red-500 font-semibold text-sm animate-pulse">
            Atualize seu nome de artista na página do seu perfil antes de fazer upload de uma música.
            <FaUserAlt className="text-red-500 text-md animate-bounce" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default Header;
