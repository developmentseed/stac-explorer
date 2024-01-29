import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";

import CubeVariablesSelect from "./CubeVairablesSelect";
import { Collection } from "../../../types";

type Props = {
  collection: Collection
}

function VariablesSelect({ collection }: Props) {
  const cubeVariables = collection["cube:variables"];

  if (cubeVariables) {
    return <CubeVariablesSelect collection={collection} />
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
