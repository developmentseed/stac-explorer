import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";

import LayerOptionsSelect from "./LayerOptionsSelect";
import { SelectProps } from "./types";

function VariablesSelect({ collection, addLayer }: SelectProps) {
  const layerOptions = collection.stac["cube:variables"] || collection.stac.renders;

  if (layerOptions) {
    return <LayerOptionsSelect collection={collection} addLayer={addLayer} />
  } else {
    return (
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle>Data from this collection cannot be visualized.</AlertTitle>
        <AlertDescription>The collection does not implement the datacube or render STAC extenstions.</AlertDescription>
      </Alert>
    );
  }
}

export default VariablesSelect;
