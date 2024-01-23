import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  Text
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
          <Text as="h1" fontSize="large" fontWeight="bold" textTransform="uppercase" borderBottom="1px solid" borderColor="gray.100" mb="4" pb="4">STAC Explorer</Text>
          <DataSelector />
          <Box>other selections</Box>
        </GridItem>
        <GridItem bg='lightblue'>map</GridItem>
      </Grid>
    </ChakraProvider>
  );
}

