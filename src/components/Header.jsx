import { Link } from 'react-router-dom'
import { Flex, Spacer, Box, IconButton, useColorMode, Text } from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';

//icons
import { FaRegLightbulb } from "react-icons/fa";
import { MdLogin } from 'react-icons/md';

const appName = "TravellingAV"

export default function Header() {
  const { toggleColorMode } = useColorMode()

  return (
    <Flex p="6">
      <Box>
        <Link to="/">
          <Text fontSize="2xl">
            <Fade left cascade>
              {appName}
            </Fade>
          </Text>
        </Link>
      </Box>
      <Spacer />
      <Box mr="5">
        <IconButton 
          aria-label="cambiar tema de luz"
          variant="solid"
          colorScheme="blue"
          size="md" 
          onClick={toggleColorMode} 
          icon={<FaRegLightbulb />}>
        </IconButton>
      </Box>
      <Box>
        <Link to="/login">
          <IconButton
            aria-label="Iniciar sesión"
            variant="solid"
            colorScheme="blue"
            size="md"
            icon={<MdLogin />}>
          </IconButton>
        </Link>
      </Box>
    </Flex>
  );
}