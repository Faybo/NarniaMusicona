import { FaPlay } from "react-icons/fa"

const PlayButton = () => {
    return (
        <button className="w-[50px] h-[10px] shadow-neon-red transition opacity-0 rounded-full flex items-center bg-white p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-80 group-hover:translate-y-0 hover:scale-110" >
            <FaPlay className="text-black"/>
        </button>
      );
}
 
export default PlayButton;