import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";
import { LayerConfig } from "../../types";
import LayerForm from "./LayerForm";

type Props = {
  layers: LayerConfig[];
  updateLayer: (config: LayerConfig) => void;
}

function Layerlist({ layers, updateLayer }: Props) {
  return (
    <>
      <Text as="h3" fontWeight="bold">Layers</Text>
      <Accordion allowToggle>
        {layers.map((layer) => {
          console.log(layer);
          const { id, name } = layer;
          return (
            <AccordionItem key={id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    { name }
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <LayerForm config={layer} updateLayer={updateLayer} />
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  );
}

export default Layerlist;
