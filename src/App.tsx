import {
  ChakraProvider,
  Grid,
  GridItem,
  Text
} from "@chakra-ui/react";

import theme from "./theme";
import DataSelector from './components/DataSelector';
import { CollectionsProvider } from "./context/collections";
import { useLayers } from "./hooks";
import LayerList from "./components/LayerList";
import Map from "./components/Map";

export default function App() {
  const { layers, addLayer, updateLayer, removeLayer, setVisibility } = useLayers();

  return (
    <ChakraProvider theme={theme}>
      <CollectionsProvider>
        <Grid
          templateColumns="400px 1fr"
          gap="5"
          p="5"
          h="100vh"
        >
          <GridItem>
            <Text as="h1" fontSize="large" fontWeight="bold" textTransform="uppercase" borderBottom="1px solid" borderColor="gray.100" mb="4" pb="4">STAC Explorer</Text>
            <LayerList
              layers={layers}
              updateLayer={updateLayer}
              setVisibility={setVisibility}
              removeLayer={removeLayer}
            />
            <DataSelector addLayer={addLayer} />
          </GridItem>
          <GridItem>
            <Map layers={layers} />
          </GridItem>
        </Grid>
      </CollectionsProvider>
    </ChakraProvider>
  );
}

