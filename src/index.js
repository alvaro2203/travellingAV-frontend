import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { ChakraProvider } from "@chakra-ui/react"
import App from './App';
import { theme } from './styles/theme';
import { AUTH_TOKEN } from './utils/constans';
import { setContext } from '@apollo/client/link/context';

//apollo client
const httpsLink = createHttpLink({
  //uri: 'http://localhost:1337/graphql',
  uri: 'http://ec2-13-38-56-20.eu-west-3.compute.amazonaws.com:1337/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpsLink),
  cache: new InMemoryCache()
})

document.title = "TravellingAV"

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);