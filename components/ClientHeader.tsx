"use client";

import { useRouter } from "next/navigation";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";
import useUploadModal from "@/hooks/useUploadModal";
import Button from "./Button";

interface ClientHeaderProps {
  className?: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({
  className,
}) => {
  const player = usePlayer();
  const router = useRouter();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Até logo!')
    }
  };

  const handleUpload = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  return (
    <div className="flex items-center gap-x-4">
      {user ? (
        <>
          <Button 
            onClick={handleUpload}
            className="
              bg-gradient-to-r from-purple-600 to-purple-900
              hover:bg-gradient-to-l hover:from-purple-900 hover:to-purple-600
              text-white
              px-8
              py-2
              rounded-full
              flex 
              items-center 
              gap-x-2 
              font-semibold
              transform
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
              hover:shadow-purple-600/50
              min-w-[140px]
              justify-center
            "
          >
            <FaCloudUploadAlt size={20} />
            Upload
          </Button>
          <Button 
            onClick={handleLogout} 
            className="
              bg-gradient-to-r from-purple-600 to-purple-900
              hover:bg-gradient-to-l hover:from-purple-900 hover:to-purple-600
              text-white
              px-8
              py-2
              rounded-full
              font-semibold
              transition-all
              duration-300
              min-w-[140px]
              justify-center
            "
          >
            Sair
          </Button>
        </>
      ) : (
        <Button 
          onClick={authModal.onOpen} 
          className="
            bg-gradient-to-r from-purple-600 to-purple-900
            hover:bg-gradient-to-l hover:from-purple-900 hover:to-purple-600
            text-white
            px-8
            py-2
            rounded-full
            font-semibold
            transition-all
            duration-300
            min-w-[140px]
            justify-center
          "
        >
          Entrar
        </Button>
      )}
    </div>
  );
}

export default ClientHeader; 