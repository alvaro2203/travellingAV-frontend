import { Link, useHistory } from 'react-router-dom'
import {
  Flex, Box, useColorMode, Text, Button, Stack, Menu, MenuButton, Avatar, MenuList, Center, MenuDivider, MenuItem, Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Badge,
  Container,
  color,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { APP_NAME, AUTH_TOKEN } from "../utils/constans";
import useMe from '../graphql/hooks/useMe';
import { client } from '../index'

//css
import '../styles/header.css'

//icons
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

export default function Header() {
  const { meExtended: me } = useMe()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure();
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
        // justifyContent="space-between"
        bg={colorMode === 'dark' ? 'gray.10' : 'gray.800'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            colorScheme='red'
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant='ghost'
            aria-label='Barra de navegación'
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link to="/">
            <Text fontSize="2xl" color="blue.600" textAlign={{ base: 'center', md: 'left' }}>
              {APP_NAME}
            </Text>
          </Link>

          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml={10}
          >
            <Stack direction='row' spacing={8}>
              <Box textTransform="uppercase" letterSpacing="wide">
                <Link to='/'>
                  <Text
                    color='blue.600'
                    fontWeight="semibold"
                    fontSize='sm'

                    _hover={{
                      textDecoration: 'underline',
                      color: 'blue.300'
                    }}
                  >
                    Alojamientos
                  </Text>
                </Link>
              </Box>
              <Box textTransform="uppercase">
                <Link to='/favorites'>
                  <Text
                    color='blue.600'
                    fontWeight="semibold"
                    fontSize='sm'
                    _hover={{
                      textDecoration: 'underline',
                      color: 'blue.300'
                    }}
                  >
                    Favoritos
                  </Text>
                </Link>
              </Box>

              <Box textTransform="uppercase">
                <Link to='/contact'>
                  <Text
                    color='blue.600'
                    fontWeight="semibold"
                    fontSize='sm'
                    _hover={{
                      textDecoration: 'underline',
                      color: 'blue.300'
                    }}
                  >
                    Contáctanos
                  </Text>
                </Link>
              </Box>
            </Stack>
          </Flex>
        </Flex>
        {/* <Box
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
        </Box> */}


        <Stack
          flex={{ base: 1, md: 0 }}
          justify='flex-end'
          direction="row"
          spacing={6}
        >
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
    </Box >
  );
}