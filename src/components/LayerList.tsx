import { IconButton, List, ListItem, Text } from "@chakra-ui/react";
import { PiEye, PiEyeSlash, PiTrash } from "react-icons/pi";

import { LayerConfig } from "../types";

type Props = {
  layers: LayerConfig[];
  setVisibility: (layerId: string, isVisible: boolean) => void;
  removeLayer: (layerId: string) => void;
}

function LayerList({ layers, setVisibility, removeLayer }: Props) {
  return (
    <>
      <Text as="h2" fontWeight="bold">Layers</Text>
      <List>
        {layers.map(({ id, name, isVisible }) => (
          <ListItem key={id} display="flex" alignItems="baseline" gap="2" marginBottom="2">
            { name }
            <IconButton
              variant="outline"
              size="xs"
              ml="2"
              aria-label={isVisible ? "Hide layer from map" : "Show layer on map"}
              icon={isVisible ? <PiEyeSlash /> : <PiEye />}
              onClick={() => setVisibility(id, !isVisible)}
            />
            <IconButton
              variant="outline"
              size="xs"
              aria-label="Remove layer"
              icon={<PiTrash />}
              onClick={() => removeLayer(id)}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default LayerList;
