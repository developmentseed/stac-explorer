import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";

import RendersOptionSelect from "./RendersOptionSelect";
import { SelectProps } from "./types";

function VariablesSelect({ collection, addLayer }: SelectProps) {
  const renderOptions = collection.stac["cube:variables"] || collection.stac.renders;

  if (renderOptions) {
    return <RendersOptionSelect collection={collection} addLayer={addLayer} />
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
