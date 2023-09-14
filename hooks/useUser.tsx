import { UserDetails } from "@/types";
import { User, useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type ExtendedUser = User & { username: string | null };

type UserContextType = {
  accessToken: string | null;
  user: ExtendedUser | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setisLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDetails = () => supabase.from('users').select('id, username').single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setisLoadingData(true);

      Promise.allSettled([getUserDetails()]).then(
        (results) => {
          const userDetailsPromise = results[0];

          if (userDetailsPromise.status === "fulfilled") {
            const userDetailsData = userDetailsPromise.value.data as UserDetails;
            const username = userDetailsData.username;
            setUserDetails({ ...userDetailsData, username });
          }
          setisLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const extendedUser: ExtendedUser | null = user ? { ...user, username: userDetails?.username || null } : null;

  const value = {
    accessToken,
    user: extendedUser,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }
  return context;
};
