import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div
            className={twMerge(`
                bg-neutral-900 
                rounded-lg 
                border
                shadow-neon-red   // Adicione esta classe para o efeito neon vermelho
                h-fit 
                w-full
            `,
                className
            )}
        >
            {children}
        </div>
    );
}

export default Box;
