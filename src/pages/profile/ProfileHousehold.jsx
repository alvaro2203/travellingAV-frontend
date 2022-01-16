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
                img="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
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