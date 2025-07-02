// "use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

type AuthSessionProviderProps = {
  children: ReactNode;
};

const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default AuthSessionProvider
