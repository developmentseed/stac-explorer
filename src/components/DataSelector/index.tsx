import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { useCollection, useCollections } from "../../hooks";
import { Error } from "../generic";
import CollectionsSelect from "./CollectionsSelect";
import VariablesSelect from "./VariablesSelect";
import { CollectionConfig, LayerConfig } from "../../types";

type Props = {
  addLayer: (layerConfig: LayerConfig) => void
}


function DataSelector({ addLayer }: Props) {
  const { collections } = useCollections();

  const [ selectedCollection, setSelectedCollection ] = useState<CollectionConfig>();
  const { collection, error: collectionError } = useCollection(selectedCollection);

  const displayError = collectionError;

  return (
    <Box>
      <CollectionsSelect
        collections={collections}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      { (selectedCollection && collection) && <VariablesSelect config={selectedCollection} collection={collection} addLayer={addLayer} /> }
      { displayError && <Error>{ displayError }</Error> }
    </Box>
  );
};

export default DataSelector;
