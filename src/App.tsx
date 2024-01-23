import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import theme from "./theme";
import DataSelector from './components/DataSelector';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container mx="auto" p="5" bgColor="white" boxShadow="md">
        <Grid
          templateColumns="300px 1fr"
          gap={4}
        >
          <GridItem bg='tomato'>
            <DataSelector />
            <Box bg='papayawhip'>other selections</Box>
          </GridItem>
          <GridItem bg='lightblue'>map</GridItem>
        </Grid>
      </Container>
    </ChakraProvider>
  );
}

