import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Button, Text, Heading} from "@chakra-ui/react";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [credentialsError, setCredentialsError] = useState<string | null>(null);

  const { error } = router.query as { error: string };

  useEffect(() => {
    if (error) {
      setCredentialsError("Not authorized");
    }
  }, [error]);

  const handleLogin = async () => {
    const response = await signIn("google", {
      redirect: false,
      callbackUrl: (router.query.returnUrl as string) || "/dashboard",
    });

    setIsRedirecting(true);

    if (response?.ok) {
      await router.push("/dashboard");
    }

    switch (response?.status) {
      case 401:
        setCredentialsError("Invalid email or password");
        break;
    }
  };

  useEffect(() => {
    if (session && !isRedirecting && router.isReady) {
      // display some message to the user that he is being redirected
      setIsRedirecting(true);
      void router.push((router.query.returnUrl as string) || "/dashboard");
    }
  }, [session, isRedirecting, router]);

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      p={4}
      textAlign="center"
    >
      <Heading size="2xl" mb={6}>Login</Heading>
      <Button colorScheme="blue" onClick={handleLogin} mb={3}>
        Login with Google
      </Button>
      {credentialsError && (
        <Text color="red.500">{credentialsError}</Text>
      )}
    </Box>
  );
};

export default SignIn;
