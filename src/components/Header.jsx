import { Link, useNavigate } from 'react-router-dom'
import { Flex, Box, useColorMode, Text, Button, Stack, Menu, MenuButton, Avatar, MenuList, Center, MenuDivider, MenuItem } from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';
import { APP_NAME, AUTH_TOKEN } from "../constans";
import IsAuth from '../hooks/isAuth';
import { client } from '../index'

//icons
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";

export default function Header() {
  const { me } = IsAuth();
  const { colorMode, toggleColorMode } = useColorMode()
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    client.resetStore()
    navigate("/login")
  }

  if (!me) return null

  return (
    <Box>
      <Flex p="8" alignItems="center" justifyContent="space-between">
        <Box>
          <Link to="/">
            <Text fontSize="2xl" color="blue.600">
              <Fade top cascade>
                {APP_NAME}
              </Fade>
            </Text>
          </Link>
        </Box>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Button
              onClick={toggleColorMode}
              aria-label="cambiar tema de luz"
              variant="ghost"
              colorScheme="blue"
              size="md"
            >
              {colorMode === 'dark' ? <BsFillBrightnessHighFill /> : <BsFillMoonFill />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  bg="blue.500"
                  name={me.me.username}
                  size="sm"
                  src=""
                />
              </MenuButton>
              <MenuList alignItems="center">
                <br />
                <Center>
                  <Avatar
                    bg="blue.500"
                    name={me.me.username}
                    size="xl"
                    src=""
                  />
                </Center>
                <br />
                <Center>
                  <p>{me.me.username}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Mi Perfil</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>

          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}