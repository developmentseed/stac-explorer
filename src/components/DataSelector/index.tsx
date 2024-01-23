import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { useCollections } from "../../hooks";
import CollectionsSelect from "./CollectionsSelect";

function DataSelector() {
  const [ selectedCollection, setSelectedCollection ] = useState<string>();
  const { collections } = useCollections();

  return (
    <Box bg='papayawhip'>
      <CollectionsSelect
        collections={collections}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      {/* additional components for the collection select, the variables checkbox, the date picker */}
    </Box>
  );
};

export default DataSelector;
