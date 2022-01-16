import { Link, useHistory } from 'react-router-dom'
import {
  Flex, Box, useColorMode, Text, Button, Stack, Menu, MenuButton, Avatar, MenuList, Center, MenuDivider, MenuItem, Badge, IconButton, useDisclosure, Collapse,
} from "@chakra-ui/react"
import { APP_NAME, AUTH_TOKEN } from "../utils/constans";
import useMe from '../graphql/hooks/useMe';

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

  if (!me) return null

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    navigate.push("/login")
  }

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
        bg={colorMode === 'dark' ? 'gray.10' : 'gray.800'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            colorScheme='blue'
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant='ghost'
            aria-label='Barra de navegación'
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} ml={{ lg: '20vh' }}>
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
              <Box textTransform="uppercase" letterSpacing="wide" pt={2}>
                <Link to='/siteMap'>
                  <Text
                    color='blue.600'
                    fontWeight="semibold"
                    fontSize='sm'

                    _hover={{
                      textDecoration: 'underline',
                      color: 'blue.300'
                    }}
                  >
                    Mapa del sitio
                  </Text>
                </Link>
              </Box>
              <Box textTransform="uppercase" letterSpacing="wide" pt={2}>
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

              <Box textTransform="uppercase" letterSpacing="wide" pt={2}>
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

              <Box textTransform="uppercase" letterSpacing="wide" pt={2}>
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

        <Stack
          flex={{ base: 1, md: 0 }}
          justify='flex-end'
          direction="row"
          spacing={6}
          mr={{ lg: '20vh' }}
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
              <Link to={`/profile/${me?.id}`}><MenuItem>Mi perfil{!isCompleted ? <Badge ml={2} bg='#FF7800'>!</Badge> : null}</MenuItem></Link>
              <Link to="/myHousehold"><MenuItem>Ofrece tu alojamiento</MenuItem></Link>
              <MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>

        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={colorMode === 'dark' ? 'gray.10' : 'gray.800'}
          p={4}
          mt={16}
          className='header'
          position='fixed'
          w='100%'
        >
          <Stack spacing={4} onClick={onToggle}>
            <Flex
              py={2}
              justify='space-between'
              align='center'
              _hover={{
                textDecoration: 'none'
              }}
            >
              <Link to='/'>
                <Text
                  fontWeight={600}
                  color='blue.600'
                >
                  Alojamientos
                </Text>
              </Link>
            </Flex>
          </Stack>

          <Stack spacing={4} onClick={onToggle}>
            <Flex
              py={2}
              justify='space-between'
              align='center'
              _hover={{
                textDecoration: 'none'
              }}
            >
              <Link to='/favorites'>
                <Text
                  fontWeight={600}
                  color='blue.600'
                >
                  Favoritos
                </Text>
              </Link>
            </Flex>
          </Stack>

          <Stack spacing={4} onClick={onToggle}>
            <Flex
              py={2}
              justify='space-between'
              align='center'
              _hover={{
                textDecoration: 'none'
              }}
            >
              <Link to='/contact'>
                <Text
                  fontWeight={600}
                  color='blue.600'
                >
                  Contáctanos
                </Text>
              </Link>
            </Flex>
          </Stack>

          <Stack spacing={4} onClick={onToggle}>
            <Flex
              py={2}
              justify='space-between'
              align='center'
              _hover={{
                textDecoration: 'none'
              }}
            >
              <Link to='/siteMap'>
                <Text
                  fontWeight={600}
                  color='blue.600'
                >
                  Mapa del sitio
                </Text>
              </Link>
            </Flex>
          </Stack>
        </Stack>
      </Collapse>
    </Box >
  );
}