import { Link } from 'react-router-dom'
import { Flex, Spacer, Box, IconButton } from "@chakra-ui/react"

import { MdLogin } from 'react-icons/md';

const appName = "TravellingAV"

export default function Header() {
  return (
    <Flex p="6">
      <Box>
        <Link to="/"><h1>{appName}</h1></Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/login">
          <IconButton 
            aria-label="Iniciar sesión"
            variant="solid"
            colorScheme="blue" 
            size="lg" 
            icon={<MdLogin />}>
          </IconButton>
        </Link>
      </Box>
    </Flex>
  );
}