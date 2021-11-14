import { Link } from 'react-router-dom'
import { Flex, Spacer, Box, IconButton, useColorMode, Text} from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';

//icons
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import { MdLogin } from 'react-icons/md';

const appName = "TravellingAV"

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
      <Flex p="10">
        <Box>
          <Link to="/">
            <Text fontSize="2xl" color="blue.600">
              <Fade top cascade>
                {appName}
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