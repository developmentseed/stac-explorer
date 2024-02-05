import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Text
} from "@chakra-ui/react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

import { LayerConfig } from "../../types";
import LayerForm from "./LayerForm";

type Props = {
  layers: LayerConfig[];
  updateLayer: (config: LayerConfig) => void;
  setVisibility: (layerId: string, isVisible: boolean) => void;
}

function Layerlist({ layers, setVisibility, updateLayer }: Props) {
  return (
    <>
      <Text as="h3" fontWeight="bold" mb="4">Layers</Text>
      <Accordion allowToggle>
        {layers.map((layer) => {
          const { id, name, isVisible } = layer;
          return (
            <AccordionItem key={id}>
              <Box display="flex" alignItems="center" _hover={{ bgColor: 'gray.50' }}>
                <Box as="h4" flex="1">
                  <AccordionButton px="0" _hover={{ bgColor: 'none '}}>
                    <AccordionIcon />
                    <Box as="span" flex="1" textAlign="left">
                    { name }
                    <Box as="span" fontSize="sm" color="gray.500" display="block">{ layer.renderConfig.variable }</Box>
                  </Box>
                  </AccordionButton>
                </Box>
                <IconButton
                  variant="outline"
                  size="xs"
                  ml="2"
                  aria-label={isVisible ? "Hide layer from map" : "Show layer on map"}
                  icon={isVisible ? <PiEyeSlash /> : <PiEye />}
                  onClick={() => setVisibility(id, !isVisible)}
                />
              </Box>
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
