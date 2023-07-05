import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Link,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Symptom Check
          </Text>
        </Flex>

        <Flex
          justify={{ base: "center", md: "start" }}
          align={{ base: "center", md: "unset" }}
        >
          <Button
            fontSize={"sm"}
            bgColor={sessionData ? "blue.50" : "blue.300"}
            fontWeight={400}
            onClick={
              sessionData
                ? () => void signOut()
                : () => void router.push("/auth/sign-in")
            }
          >
            {sessionData ? "Sign Out" : "Sign In"}
          </Button>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      <Link
        p={2}
        fontSize={"sm"}
        fontWeight={500}
        color={"black"}
        _hover={{
          textDecoration: "none",
          
        }}
      >
        Symptom Checker
      </Link>
      <Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")} align={"start"}>
        <Link py={2}>
          
        </Link>
      </Stack>
    </Box>
  );
};
