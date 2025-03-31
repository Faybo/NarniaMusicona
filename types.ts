export interface Song {
    id: string;
    user_id: string;
    artist: string;
    title: string;
    song_path: string;
    image_path: string; 
    username: string;
};

export interface UserDetails {
    id: string;
    username: string;
    avatar_url?: string;
};