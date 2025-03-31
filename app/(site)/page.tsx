import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/Pagecontent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="
      bg-gradient-to-b from-black via-purple-900/10 to-black
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <Header>
        <div className="mb-6 mt-6 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent animate-pulse">
            Narnia Crib Original Music
          </h1>
        </div>
      </Header>
      <div className="px-6">
        <PageContent songs={songs} />
      </div>
    </div>
  )
} 