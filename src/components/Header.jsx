import { Link, useHistory } from 'react-router-dom'
import {
  Flex, Box, useColorMode, Text, Button, Stack, Menu, MenuButton, Avatar, MenuList, Center, MenuDivider, MenuItem, Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Badge,
  Container,
  color,
} from "@chakra-ui/react"
import { APP_NAME, AUTH_TOKEN } from "../utils/constans";
import useMe from '../graphql/hooks/useMe';
import { client } from '../index'

//css
import '../styles/header.css'

//icons
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";

export default function Header() {
  const { meExtended: me } = useMe()
  const { colorMode, toggleColorMode } = useColorMode()
  let isCompleted = false
  let navigate = useHistory();

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    client.resetStore()
    navigate.push("/login")
  }

  if (!me) return null

  if (me.name && me.surname && me.telephone) isCompleted = true

  return (
    <Box>
      <Flex
        className='header'
        as='header'
        position='fixed'
        w='100%'
        p="4"
        alignItems="center"
        justifyContent="space-between"
        bg={colorMode === 'dark' ? 'gray.10' : 'gray.800'}
      >
        <Box ml={{ lg: '20vh' }}>
          <Link to="/">
            <Text fontSize="2xl" color="blue.600">
              {APP_NAME}
            </Text>
          </Link>
        </Box>

        <Box
          color="blue.600"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml={{ lg: '0', md: '10px', base: '20px' }}
        >
          <Breadcrumb separator='-'>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">Alojamientos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/favorites">Favoritos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} to="/contact">Contáctanos</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>


        <Flex alignItems="center" mr={{ lg: '20vh' }}>
          <Stack direction="row" spacing={7}>
            <Button
              onClick={toggleColorMode}
              aria-label="cambiar tema de luz"
              variant="ghost"
              color='blue.600'
              size="md"
              _hover={colorMode === 'light' ? { bg: 'gray.800' } : { bg: 'gray.10' }}
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
                  bg="blue.600"
                  name={me.username}
                  size="sm"
                // src={`https://travellingav.s3.eu-west-3.amazonaws.com/${me.avatar}`}
                />
              </MenuButton>
              <MenuList alignItems="center">
                <br />
                <Center>
                  <Avatar
                    bg="blue.600"
                    name={me.username}
                    size="xl"
                  // src={`https://travellingav.s3.eu-west-3.amazonaws.com/${me.avatar}`}
                  />
                </Center>
                <br />
                <Center>
                  <p>{me.username}</p>
                </Center>
                <br />
                <MenuDivider />
                <Link to={`/profile/${me.id}`}><MenuItem>Mi perfil{!isCompleted ? <Badge ml={2} bg='#FF7800'>!</Badge> : null}</MenuItem></Link>
                <Link to="/myHousehold"><MenuItem>Ofrece tu alojamiento</MenuItem></Link>
                <MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>

          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}