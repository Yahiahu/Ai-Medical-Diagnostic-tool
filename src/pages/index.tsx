import React from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import UserLayout from "~/components/layouts/UserLayout";

export default function SplitScreen() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const handleDiagnoseMe = () => {
    if (sessionData) {
      void router.push("http://localhost:3000/dashboard");
    } else {
      void router.push("http://localhost:3000/auth/sign-in");
    }
  };

  return (
    <UserLayout>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Self-Reported Medical Diagnostic Tool
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                Powered by Ai
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              This website aims to democratize medicine and reduce wait times by
              providing individuals with quick and efficient diagnosis based on
              their symptoms and pain level. By leveraging technology, we strive
              to make healthcare accessible to everyone and empower individuals
              to take control of their health.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleDiagnoseMe}
              >
                {sessionData ? "Go to Dashboard" : "Diagnose me"}
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={"https://i.ebayimg.com/images/g/OoEAAOSwmfhX3E15/s-l1600.jpg"}
          />
        </Flex>
      </Stack>
    </UserLayout>
  );
}
