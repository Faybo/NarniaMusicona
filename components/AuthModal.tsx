"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (email !== '123@hotmail.com' || password !== '123') {
            toast.error('Credenciais inválidas. Este site é apenas para amigos!');
            setIsLoading(false);
            return;
        }

        const { error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            toast.error('Erro ao fazer login. Tente novamente.');
        } else {
            toast.success('Bem-vindo de volta!');
            router.refresh();
            onClose();
        }

        setIsLoading(false);
    }

    return (
        <Modal 
            title="Bem-vindo ao Narnia Crib Music" 
            description="Este site é exclusivo para amigos" 
            isOpen={isOpen} 
            onChange={onChange}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div>
                    <div className="pb-1">
                        Email
                    </div>
                    <Input
                        placeholder="123@hotmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Senha
                    </div>
                    <Input
                        placeholder="123"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-white text-black font-bold"
                >
                    {isLoading ? 'Carregando...' : 'Entrar'}
                </Button>
                <p className="text-center text-sm text-neutral-400">
                    Este site é exclusivo para amigos.
                    <br />
                    Use o email: 123@hotmail.com
                    <br />
                    Senha: 123
                </p>
            </form>
        </Modal>
    );
}
 
export default AuthModal;