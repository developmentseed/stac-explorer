import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import theme from "./theme";
import DataSelector from './components/DataSelector';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateColumns="300px 1fr"
        gap="5"
        p="5"
        h="100vh"
      >
        <GridItem>
          <DataSelector />
          <Box>other selections</Box>
        </GridItem>
        <GridItem bg='lightblue'>map</GridItem>
      </Grid>
    </ChakraProvider>
  );
}

