import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";

import CubeVariablesSelect from "./CubeVariablesSelect";
import { SelectProps } from "./types";

function VariablesSelect({ collection, addLayer }: SelectProps) {
  const cubeVariables = collection.stac["cube:variables"];

  if (cubeVariables) {
    return <CubeVariablesSelect collection={collection} addLayer={addLayer} />
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
