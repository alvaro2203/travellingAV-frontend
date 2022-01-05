import {
    Container,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import DataHousehold from "../../components/DataHousehold"
import { Authentication } from '../../utils/authentication';
import MyHouseholds from "../../components/MyHouseholds"
import TextBeginning from "../../components/TextBeginning"

export default function ProfileHousehold() {
    Authentication()

    return (
        <div>
            <Header />

            <TextBeginning
                title="ofrece tu alojamiento"
                text="¿Tienes una vivienda que no utilizas y quieres sacarle provecho? Aquí podrás compartirla con los usuarios de la plataforma. Tú pones las normas"
            />

            <Container maxW="container.xl">
                <Tabs variant="enclosed" align="center">
                    <TabList>
                        <Tab>Ofrece tu alojamiento</Tab>
                        <Tab>Mis alojamientos</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <DataHousehold />
                        </TabPanel>
                        <TabPanel>
                            <MyHouseholds />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>

            <Footer />
        </div>
    )
}