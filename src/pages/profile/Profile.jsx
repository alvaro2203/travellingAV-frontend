import { Box, Button, Center, Container, FormControl, FormLabel, Grid, Heading, Input, Spinner, Text, useToast } from "@chakra-ui/react";
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

const S3_BUCKET = 'travellingav'
const REGION = 'eu-west-3'

AWS.config.update({
  // accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  // secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  accessKeyId: 'AKIAYP7EIJRTZO7OS6OB',
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

    if (file.name !== me.avatar) {
      myBucket.putObject(params)
        .send((err) => {
          if (err) console.log(err)
        })
    }
  }

  const initialValues = {
    nombre: me.name,
    apellido: me.surname,
    telefono: me.telephone
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
        // uploadFile(selectedFile)
        let avatar;

        selectedFile?.name === null
          ? avatar = me?.avatar
          : avatar = selectedFile?.name

        await updateUser({
          variables: {
            id: me.id,
            name: values.nombre,
            surname: values.apellido,
            telephone: values.telefono,
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

      <Container maxW="container.xl" mt="10">
        <Center>
          <Heading>Bienvenid@ {me.username}</Heading>
        </Center>

        <Box my="10">
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
              <Box>
                <FormControl>
                  <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                    <FormLabel textAlign="center">Nombre: </FormLabel>
                    <Input
                      name="nombre"
                      value={values.nombre}
                      onChange={handleChange}
                    />
                  </Grid>
                </FormControl>

                <FormControl my="5">
                  <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                    <FormLabel textAlign="center">Apellido: </FormLabel>
                    <Input
                      name="apellido"
                      value={values.apellido}
                      onChange={handleChange}
                    />
                  </Grid>
                </FormControl>

                <FormControl my="5">
                  <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                    <FormLabel textAlign="center">Teléfono: </FormLabel>
                    <Input
                      type="number"
                      name="telefono"
                      value={values.telefono}
                      onChange={handleChange}
                    />
                  </Grid>
                </FormControl>

                <FormControl my="5">
                  <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                    <FormLabel textAlign="center">Avatar: </FormLabel>
                    <input type="file" onChange={handleFileInput} />
                  </Grid>
                </FormControl>

              </Box>

              <Box my="10">
                <Button
                  w="full"
                  type="submit"
                  borderRadius="lg"
                  disabled={isSubmitting}
                >
                  Aceptar
                </Button>
              </Box>
            </Form>
          )}

        </Formik>

      </Container>

      <Footer />

    </div>
  );
}
