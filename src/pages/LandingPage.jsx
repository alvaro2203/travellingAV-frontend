import { useQuery, gql } from '@apollo/client'
import { Container, Spinner, Box, Text, Flex, Stack, Button, Heading, Image, Grid, Center, Avatar, Badge } from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';
import LandingMap from "../components/LandingMap"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Authentication } from '../utils/authentication';
import UseHouseholds from '../graphql/hooks/useHouseholds'
import { APP_NAME } from '../utils/constans'
import { StarIcon } from '@chakra-ui/icons';

const GET_PLACES = gql`
  query getPlaces {
    places {
      place
    }
  }
`

export default function LandingPage() {
  Authentication()
  const { loading, error, data } = useQuery(GET_PLACES);
  const { loadingHousehold, errorHousehold, getHouseholds } = UseHouseholds();

  if (loading || loadingHousehold) return (
    <Container maxW="container.md" textAlign="center">
      <Spinner size="xl" thickness="4px" speed="0.65s" />
    </Container>
  )

  if (error || errorHousehold) return (
    <Box>
      <Text>Error :( </Text>
    </Box>
  )

  return (
    <div>
      <Header />

      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.300',
                  zIndex: -1,
                }}>
                {APP_NAME}
              </Text>
              <br />
              <Text as={'span'} color={'blue.300'}>
                busca tu alojamiento
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Snippy is a rich coding snippets app that lets you create your own
              code snippets, categorize them, and even sync them in the cloud so
              you can use them anywhere. All that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}>
                Get started
              </Button>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
              >
                How It Works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}>
            <Box
              position={'relative'}
              height={'300px'}
              rounded={'2xl'}
              width={'full'}
              overflow={'hidden'}
              boxShadow="dark-lg"
            >
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={
                  'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsbGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                }
              />
            </Box>
          </Flex>
        </Stack>
      </Container>

      <Container maxW="container.xl">
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          {getHouseholds.userHouseholds.map(userHousehold => (
            <Center>
              <Box maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="dark-lg" mb="14">
                <Image
                  src="https://media.istockphoto.com/photos/close-up-of-small-blue-gray-mobile-home-with-a-front-and-side-porch-picture-id1297687835?b=1&k=20&m=1297687835&s=170667a&w=0&h=Kj4yvWxQxYo_fc9801IJZrHCAXa06LNsiRLjovVfoQQ="
                />

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      New
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {userHousehold.household.bedrooms} habitaciones &bull; {userHousehold.household.toilets} baños &bull; {userHousehold.household.guests} huéspedes
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {userHousehold.household.location.street}
                  </Box>

                  <Box>
                    {userHousehold.household.price}€
                    <Box as="span" color="gray.500" fontSize="sm">
                      /semana
                    </Box>
                  </Box>
                  <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                      src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                      alt={'Author'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                      <Text fontWeight={600}>{userHousehold.user.email}</Text>
                      <Text color={'gray.500'}>{userHousehold.created_at}</Text>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Center>
          ))}
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}