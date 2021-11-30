import { useQuery, gql } from '@apollo/client'
import { Container, Spinner, Box, Text, Flex, Stack, Button, Heading, Image, Grid, Center, Avatar } from "@chakra-ui/react"
import Fade from 'react-reveal/Fade';
import LandingMap from "../components/LandingMap"
import Header from "../components/Header"
import { Authentication } from '../utils/authentication';
import UseHouseholds from '../graphql/hooks/useHouseholds'
import { APP_NAME } from '../utils/constans'

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

  console.log(getHouseholds.userLocations)

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
        <Grid templateColumns='repeat(2, 1fr)' gap={10}>
          {getHouseholds.userLocations.map(household => (
            <Center py={6}>
              <Box
                maxW={'445px'}
                w={'full'}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
                >
                <Box
                  h={'290px'}
                  bg={'gray.100'}
                  mt={-6}
                  mx={-6}
                  mb={6}
                  pos={'relative'}
                  >
                  <Image
                    src={
                      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    }
                    layout={'fill'}
                  />
                </Box>
                <Stack>
                  <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}>
                    Blog
                  </Text>
                  <Heading
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {household.location.household.location.street}
                  </Heading>
                  <Text color={'gray.500'}>
                    Ubicación: {household.location.household.location.place.place}
                  </Text>
                  <Text color={'gray.500'}>
                    Precio: {household.location.household.price}€
                  </Text>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                  <Avatar
                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                    alt={'Author'}
                  />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{household.users_permissions_user.email}</Text>
                    <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                  </Stack>
                </Stack>
              </Box>
            </Center>
          ))}
        </Grid>
      </Container>
    </div>
  );
}