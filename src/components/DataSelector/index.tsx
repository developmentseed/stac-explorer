import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { useCollection, useCollections } from "../../hooks";
import { Error } from "../generic";
import CollectionsSelect from "./CollectionsSelect";
import VariablesSelect from "./VariablesSelect";
import { LayerConfig } from "../../types";

type Props = {
  addLayer: (layerConfig: LayerConfig) => void
}


function DataSelector({ addLayer }: Props) {
  const { collections } = useCollections();

  const [ selectedCollection, setSelectedCollection ] = useState<string>();
  const { collection, error: collectionError } = useCollection(selectedCollection);
  const collectionConfig = collections?.find(({ id }) => id === selectedCollection);

  const displayError = collectionError;

  return (
    <Box>
      <CollectionsSelect
        collections={collections}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      { (collectionConfig && collection) && <VariablesSelect config={collectionConfig} collection={collection} addLayer={addLayer} /> }
      { displayError && <Error>{ displayError }</Error> }
    </Box>
  );
};

export default DataSelector;
