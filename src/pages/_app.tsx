import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout";

interface AppAuthProps {
  session?: Session | null;
  requireAuth?: boolean;
}

type AppPropsWithAuth = AppProps & AppAuthProps;
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
      {(Component as AppAuthProps).requireAuth ? (
        <ProtectedLayout>
          <Component {...pageProps} />
        </ProtectedLayout>
      ) : (
        <Component {...pageProps} />
      )}
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
