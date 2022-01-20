import {
  Box, Button, Center, Container, FormControl, Grid, GridItem, Heading, Input, Spinner, Text, useToast,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import { Authentication } from "../../utils/authentication";
import useMe from "../../graphql/hooks/useMe"
import { Form, Formik } from "formik";
import { UPDATE_USER } from "../../graphql/mutations/updateUser";
import { useMutation } from "@apollo/client";
import { ME_EXTENDED } from "../../graphql/queries/me"
import AWS from 'aws-sdk'
import { useState } from 'react'

//css
import './avatar.css'

const S3_BUCKET = 'travellingav'
const REGION = 'eu-west-3'

AWS.config.update({
  // accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  // secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  accessKeyId: 'AKIAYP7EIJRTZRER2VQX',
  secretAccessKey: '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',
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

export default function Profile() {
  Authentication()
  const { meExtended: me, refetch } = useMe();
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: ME_EXTENDED }]
  })
  const [selectedFile, setSetelectedFile] = useState(null)
  const toast = useToast()

  if (!me) return null

  const handleFileInput = (e) => {
    setSetelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };

    if (file.name !== me?.avatar) {
      myBucket.putObject(params)
        .send((err) => {
          if (err) console.log(err)
        })
    }
  }

  const initialValues = {
    nombre: me?.name,
    apellido: me?.surname,
    telefono: me?.telephone
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    try {
      if (!values.nombre || !values.apellido || !values.telefono) {
        toast({
          title: "Error",
          description: "Introduce los campos necesarios",
          status: "error",
          position: "bottom-right",
          duration: 3000,
          isClosable: true
        })
      } else {
        let avatar;

        if (selectedFile !== null && selectedFile?.name !== me?.avatar) {
          uploadFile(selectedFile)
        }

        selectedFile?.name === null
          ? avatar = me?.avatar
          : avatar = selectedFile?.name

        await updateUser({
          variables: {
            id: me?.id,
            name: values?.nombre,
            surname: values?.apellido,
            telephone: values?.telefono,
            avatar: avatar
          }
        }).then(() => {
          refetch()
          toast({
            title: "Perfil actualizado",
            description: "Se ha actualizado tu perfil correctamente",
            status: "success",
            position: "bottom-right",
            duration: 3000,
            isClosable: true
          })
        })
      }

    } catch (e) {
      console.log(e)
    }
  }

  if (loading) return (
    <Container maxW="container.md" textAlign="center">
      <Spinner size="xl" thickness="4px" speed="0.65s" />
    </Container>
  )

  if (error) return (
    <Box>
      <Text>Error :( </Text>
    </Box>
  )

  return (
    <div>
      <Header />

      <Container maxW="container.xl" my={20}>
        <Center>
          <Heading my={12}>Bienvenid@ {me?.username}</Heading>
        </Center>

        <Box my={12} textAlign='center'>
          <Text>Ayúdanos a completar tu perfil para una mejor experiencia con la plataforma</Text>
          <Text>Solo tienes que rellenar los siguientes datos: </Text>
        </Box>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            handleSubmit,
            values,
            handleChange
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box p={10} my={12}>
                <Center>
                  <Grid templateColumns={{ lg: 'repeat(7, 1fr)', md: 'repeat(5, 1fr)', base: 'repeat(3, 1fr)' }} gap={6}>
                    <GridItem colSpan={1} colStart={{ lg: 3, md: 2, base: 2 }}>
                      <Box>
                        <div className="profile-img">
                          <img
                            src={me?.avatar
                              ? `https://travellingav.s3.eu-west-3.amazonaws.com/${me?.avatar}`
                              : 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg'}
                            alt=""
                          />
                          <div className="file">
                            Cambiar foto
                            <input type='file' name='file' onChange={handleFileInput} />
                          </div>
                        </div>
                      </Box>

                    </GridItem>

                    <GridItem colSpan={{ lg: 3, md: 3, base: 3 }}>
                      <FormControl mt='6'>
                        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                          <Text textAlign='center' fontWeight='bold'>Nombre: </Text>
                          <Input
                            name="nombre"
                            value={values.nombre ? values.nombre : undefined}
                            onChange={handleChange}
                            variant='flushed'
                            size='sm'
                          />
                        </Grid>
                      </FormControl>

                      <FormControl my="6">
                        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                          <Text textAlign='center' fontWeight='bold'>Apellido: </Text>
                          <Input
                            name="apellido"
                            value={values.apellido ? values.apellido : undefined}
                            onChange={handleChange}
                            variant='flushed'
                            size='sm'
                          />
                        </Grid>
                      </FormControl>

                      <FormControl my="6">
                        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                          <Text textAlign='center' fontWeight='bold'>Teléfono: </Text>
                          <Input
                            type="number"
                            name="telefono"
                            value={values.telefono ? values.telefono : undefined}
                            onChange={handleChange}
                            variant='flushed'
                            size='sm'
                          />
                        </Grid>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Center>
              </Box>

              <Container mb="10" mt='5'>
                <Button
                  w="full"
                  type="submit"
                  borderRadius="lg"
                  bg='blue.600'
                  color='black'
                  disabled={isSubmitting}
                >
                  Aceptar
                </Button>
              </Container>


            </Form>
          )}

        </Formik>

      </Container>

      <Footer />

    </div>
  );
}
