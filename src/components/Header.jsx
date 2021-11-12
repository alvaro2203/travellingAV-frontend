import { Link } from 'react-router-dom'
import { Flex, Spacer, Box, IconButton, useColorMode, Text, Divider} from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';

//icons
import { FaRegLightbulb } from "react-icons/fa";
import { MdLogin } from 'react-icons/md';

const appName = "TravellingAV"

export default function Header() {
  const { toggleColorMode } = useColorMode()

  return (
    <div>
      <Flex p="10">
        <Box>
          <Link to="/">
            <Text fontSize="2xl" color="brand.400">
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
            colorScheme="brand"
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
              colorScheme="brand"
              size="md"
              icon={<MdLogin />}>
            </IconButton>
          </Link>
        </Box>
      </Flex>
    </div>
  );
}