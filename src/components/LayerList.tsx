import { IconButton, List, ListItem, Text } from "@chakra-ui/react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

import { LayerConfig } from "../types";

type Props = {
  layers: LayerConfig[];
  setVisibility: (layerId: string, isVisible: boolean) => void;
}

function LayerList({ layers, setVisibility }: Props) {
  return (
    <>
      <Text as="h2" fontWeight="bold">Layers</Text>
      <List>
        {layers.map(({ id, name, isVisible }) => (
          <ListItem key={id} display="flex" alignItems="baseline" gap="4" marginBottom="2">
            { name }
            <IconButton
              variant="outline"
              size="xs"
              aria-label={isVisible ? "Hide layer from map" : "Show layer on map"}
              icon={isVisible ? <PiEyeSlash /> : <PiEye />}
              onClick={() => setVisibility(id, !isVisible)}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default LayerList;
