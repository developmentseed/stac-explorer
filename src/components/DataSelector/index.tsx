import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { useCollection, useCollections } from "../../hooks";
import { Error } from "../generic";
import CollectionsSelect from "./CollectionsSelect";
import VariablesSelect from "./VariablesSelect";


function DataSelector() {
  const { collections } = useCollections();
  const [ selectedCollection, setSelectedCollection ] = useState<string>();
  const { collection, error: collectionError } = useCollection(selectedCollection);

  const displayError = collectionError;

  return (
    <Box>
      <CollectionsSelect
        collections={collections}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      { collection && <VariablesSelect collection={collection} /> }
      { displayError && <Error>{ displayError }</Error> }
    </Box>
  );
};

export default DataSelector;
