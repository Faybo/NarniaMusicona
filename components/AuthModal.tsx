"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaLock, FaEnvelope } from "react-icons/fa";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabaseClient.auth.signInWithPassword({
                email: "123@hotmail.com",
                password: "123"
            });

            if (error) {
                toast.error(error.message);
            } else {
                toast.success('Logado com sucesso!');
                router.refresh();
                onClose();
            }
        } catch (error) {
            toast.error('Algo deu errado!');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal 
            title="Narnia Crib Music" 
            description="Entre com as credenciais abaixo" 
            isOpen={isOpen} 
            onChange={onChange}
        >
            <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
                <div className="bg-neutral-800 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-x-2">
                        <FaEnvelope className="text-purple-400" />
                        <p className="text-white">Email: 123@hotmail.com</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <FaLock className="text-purple-400" />
                        <p className="text-white">Senha: 123</p>
                    </div>
                </div>
                
                <button
                    disabled={isLoading}
                    className="
                        w-full
                        p-3
                        rounded-full
                        bg-gradient-to-r from-purple-600 to-purple-900
                        hover:bg-gradient-to-l hover:from-purple-900 hover:to-purple-600
                        text-white
                        font-bold
                        transition
                        transform
                        hover:scale-105
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        shadow-lg
                        hover:shadow-purple-600/50
                    "
                >
                    {isLoading ? 'Carregando...' : 'Entrar'}
                </button>
            </form>
        </Modal>
    );
}
 
export default AuthModal;