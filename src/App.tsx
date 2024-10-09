import * as React from "react"
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"


import Form from './components/Form';

export const App = () => (
  <ChakraProvider theme={theme}>
   <Form />

  </ChakraProvider>
)
