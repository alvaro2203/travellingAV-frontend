import {
  Container, Spinner, Box, Text, Grid, GridItem, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure,
  Heading, Radio, Stack, RadioGroup, Input, InputGroup, InputLeftElement, Tooltip,
} from "@chakra-ui/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Authentication } from '../utils/authentication';
import UseHouseholds from '../graphql/hooks/households/useHouseholds'
import HouseholdCard from "../components/HouseholdCard";
import TextBeginning from "../components/TextBeginning";
import { useRef, useState, useEffect } from "react";

//icons
import { IoMdSwitch, IoMdSearch } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

export default function LandingPage() {

  Authentication()
  const { loadingHouseholds, errorHouseholds, getHouseholds, refetchHouseholds } = UseHouseholds();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [inputSearch, setInputSearch] = useState("")
  const [allData, setAllData] = useState([getHouseholds?.households])
  const [priceValue, setPriceValue] = useState("0")
  const [roomsValue, setRoomsValue] = useState("0")
  const [guestsValue, setGuestsValue] = useState("0")
  const [toiletsValue, setToiletsValue] = useState("0")
  const [showTooltip, setShowTooltip] = useState(false)
  const [order, setOrder] = useState("1")

  const handleSearch = (e) => {
    setInputSearch(e.target.value)
  }

  const restartFilters = () => {
    setAllData(getHouseholds?.households)
    setInputSearch("")
    setPriceValue("0")
    setRoomsValue("0")
    setGuestsValue("0")
    setToiletsValue("0")
    setOrder("1")
  }

  useEffect(() => {
    const households = getHouseholds?.households
    let results = []
    results = households?.filter(h =>
      h?.location?.city?.toLowerCase().includes(inputSearch.toLowerCase()) ||
      h?.location?.place?.name?.toLowerCase().includes(inputSearch.toLowerCase()) ||
      h?.location?.street?.toLowerCase().includes(inputSearch.toLowerCase()) ||
      h?.user?.username?.toLowerCase().includes(inputSearch.toLowerCase())
    )

    if (priceValue !== "0") {
      results = households?.filter(h => h.price <= priceValue)
    }

    if (roomsValue !== "0") {
      results = results?.filter(h => {
        if (roomsValue !== "3") {
          return h.bedrooms == roomsValue
        } else {
          return h.bedrooms >= roomsValue
        }
      })
    }

    if (guestsValue !== "0") {
      results = results?.filter(h => {
        if (guestsValue !== "3") {
          return h.guests == guestsValue
        } else {
          return h.guests >= guestsValue
        }
      })
    }

    if (toiletsValue !== "0") {
      results = results?.filter(h => {
        if (toiletsValue !== "3") {
          return h.toilets == toiletsValue
        } else {
          return h.toilets >= toiletsValue
        }
      })
    }

    //order
    if (order === "1") {
      results?.sort((a, b) => a.price > b.price ? 1 : a.price < b.price ? -1 : 0)
    } else if (order === "2") {
      results?.sort((a, b) => a.price < b.price ? 1 : a.price > b.price ? -1 : 0)
    } else if (order === "3") {
      results?.sort((a, b) => a.guests > b.guests ? 1 : a.guests < b.guests ? -1 : 0)
    } else {
      results?.sort((a, b) => a.guests < b.guests ? 1 : a.guests > b.guests ? -1 : 0)
    }

    setAllData(results)
  }, [inputSearch, getHouseholds?.households, guestsValue, priceValue, roomsValue, toiletsValue, order])

  if (loadingHouseholds) return (
    <Container maxW="container.md" textAlign="center">
      <Spinner size="xl" thickness="4px" speed="0.65s" />
    </Container>
  )

  if (errorHouseholds) return (
    <Box>
      <Text>Error :( </Text>
    </Box>
  )

  refetchHouseholds()

  return (
    <div>
      <Header />

      <TextBeginning
        title="busca tu alojamiento"
        text="Bienvenido a TravellingAV, aquí podrás encontrar el mejor sitio para pasar tus vacaciones. Elige la zona, y a buscar !!"
        img="https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsbGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'"
      />

      <Container maxW="container.xl">
        <Box my={6} p={3}>
          <Grid
            templateColumns={{ lg: 'repeat(8, 1fr)', base: 'repeat(4, 1fr)' }}
            gap={6}>
            <GridItem colSpan={{ lg: 6, base: 4 }}>
              <InputGroup>
                <InputLeftElement
                  pointersevents="none"
                  children={<IoMdSearch color='gray.300' />}
                />
                <Input
                  placeholder="Busca por comunidad, ciudad, calle, nombre, etc"
                  value={inputSearch}
                  onChange={handleSearch}
                  lefticon={<IoMdSearch />}
                />
              </InputGroup>
            </GridItem>

            <GridItem colSpan={2}>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button ref={btnRef} variant='outline' onClick={onOpen} leftIcon={<IoMdSwitch />}>
                  Filtros
                </Button>

                <Button variant='outline' onClick={restartFilters} leftIcon={<VscDebugRestart />}>
                  Reiniciar
                </Button>
              </Stack>
            </GridItem>

          </Grid>

          <Drawer
            isOpen={isOpen}
            placement="rigth"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Más filtros</DrawerHeader>
              <DrawerBody>
                <Text>Precio</Text>
                <Slider
                  aria-label='slider-ex-1'
                  min={20}
                  max={400}
                  defaultValue={70}
                  value={priceValue}
                  onChange={setPriceValue}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    placement="top"
                    isOpen={showTooltip}
                    label={`${priceValue}€`}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>

                <Text mt={5}>Habitaciones</Text>
                <RadioGroup onChange={setRoomsValue} value={roomsValue}>
                  <Stack direction='row'>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3+</Radio>
                  </Stack>
                </RadioGroup>

                <Text mt={5}>Huéspedes</Text>
                <RadioGroup onChange={setGuestsValue} value={guestsValue}>
                  <Stack direction='row'>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3+</Radio>
                  </Stack>
                </RadioGroup>

                <Text mt={5}>Baños</Text>
                <RadioGroup onChange={setToiletsValue} value={toiletsValue}>
                  <Stack direction='row'>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3+</Radio>
                  </Stack>
                </RadioGroup>

              </DrawerBody>
              <DrawerHeader>Ordenar</DrawerHeader>
              <DrawerBody>
                <Text mt={5}>Precio</Text>
                <RadioGroup onChange={setOrder} value={order}>
                  <Stack direction='row'>
                    <Radio value="1">Mas bajo</Radio>
                    <Radio value="2">Mas alto</Radio>
                  </Stack>
                </RadioGroup>
                <Text mt={5}>Huéspedes</Text>
                <RadioGroup onChange={setOrder} value={order}>
                  <Stack direction='row'>
                    <Radio value="3">Mas bajo</Radio>
                    <Radio value="4">Mas alto</Radio>
                  </Stack>
                </RadioGroup>
              </DrawerBody>
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cerrar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>

        <Grid
          templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', base: 'repeat(1, 1fr)' }}
          gap={{ lg: 6, md: 4, base: 1 }}>
          {allData?.length === 0
            ? <Box my={12}><Heading>No se han encontrado coincidencias</Heading></Box>
            : allData?.map((household, index) => (
              <HouseholdCard key={index} props={household} />
            ))
          }
        </Grid>
      </Container>

      <Footer />
    </div >
  );
}