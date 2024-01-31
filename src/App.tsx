import {
  ChakraProvider,
  Grid,
  GridItem,
  Text
} from "@chakra-ui/react";
import theme from "./theme";
import DataSelector from './components/DataSelector';
import { useCallback, useState } from "react";
import { LayerConfig } from "./types";
import LayerList from "./components/LayerList";

export default function App() {
  const [ layers, setLayers ] = useState<LayerConfig[]>([]);

  const addLayer = useCallback((newLayer: LayerConfig) => {
    setLayers([
      ...layers,
      newLayer
    ])
  }, [layers]);

  const setLayerVisibility = ( layerId: string, isVisible: boolean) => {
    const updatedLayers = layers.map((layer) => {
      if (layer.id === layerId) {
        return {
          ...layer,
          isVisible
        }
      } else {
        return layer;
      }
    });
    setLayers(updatedLayers);
  };

  const removeLayer = (layerId: string) => {
    const updatedLayers = layers.filter(({ id }) => id !== layerId);
    setLayers(updatedLayers);
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateColumns="300px 1fr 300px"
        gap="5"
        p="5"
        h="100vh"
      >
        <GridItem>
          <Text as="h1" fontSize="large" fontWeight="bold" textTransform="uppercase" borderBottom="1px solid" borderColor="gray.100" mb="4" pb="4">STAC Explorer</Text>
          <DataSelector addLayer={addLayer} />
        </GridItem>
        <GridItem bg='lightblue'>map</GridItem>
        <GridItem>
          <LayerList layers={layers} setVisibility={setLayerVisibility} removeLayer={removeLayer} />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

