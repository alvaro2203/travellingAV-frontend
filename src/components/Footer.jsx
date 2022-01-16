import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { APP_NAME } from '../utils/constans';

//css
import '../styles/header.css'

export default function Footer() {
  const { colorMode } = useColorMode()

  return (
    <Box
      bg={colorMode === 'dark' ? 'gray.10' : 'gray.800'}
      color={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={10}
        className='footer'
      >
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              {APP_NAME}
            </Box>
            <Text fontSize={'sm'}>
              © 2020 {APP_NAME}. All rights reserved
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Product</Text>
            <Link href={'#'}>Overview</Link>
            <Link href={'#'}>Features</Link>
            <Link href={'#'}>Tutorials</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Company</Text>
            <Link href={'#'}>About</Link>
            <Link href={'/Contact'}>Contact</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Support</Text>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy Policy</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Follow Us</Text>
            <Link href={'https://Facebook.com'}>Facebook</Link>
            <Link href={'https://Twitter.com'}>Twitter</Link>
            <Link href={'https://Instagram.com'}>Instagram</Link>
            <Link href={'https://Linkedin.com'}>Linkedin</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}