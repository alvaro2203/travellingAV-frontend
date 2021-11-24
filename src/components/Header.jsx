import { Link } from 'react-router-dom'
import { Flex, Spacer, Box, IconButton, useColorMode, Text} from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';
import { APP_NAME } from "../constans";

//icons
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import { MdLogin } from 'react-icons/md';
// import { FaUser } from "react-icons/fa";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  // const isAuth = localStorage.getItem('auth-token')

  return (
    <div>
      <Flex p="10">
        <Box>
          <Link to="/">
            <Text fontSize="2xl" color="blue.600">
              <Fade top cascade>
                {APP_NAME}
              </Fade>
            </Text>
          </Link>
        </Box>

        <Spacer />

        <Box mr="5">
          <IconButton 
            aria-label="cambiar tema de luz"
            variant="ghost"
            colorScheme="blue"
            size="md" 
            onClick={toggleColorMode} 
            icon={colorMode === 'dark' ? <BsFillBrightnessHighFill /> : <BsFillMoonFill />}>
          </IconButton>
        </Box>
        <Box>
          <Link to="/login">
            <IconButton
              aria-label="Iniciar sesión"
              variant="ghost"
              colorScheme="blue"
              size="md"
              icon={<MdLogin />}
            >
            </IconButton>
          </Link>
        </Box>
      </Flex>
    </div>
  );
}