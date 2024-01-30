import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { CollectionConfig } from "../../types";

type Props = {
  collections?: CollectionConfig[];
  selectedCollection?: CollectionConfig;
  setSelectedCollection: (collection?: CollectionConfig) => void;
}

function CollectionsSelect({
  collections = [],
  selectedCollection,
  setSelectedCollection
}: Props) {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(collections.find(({ id }) => id === event.target.value))
  };

  return (
    <FormControl mb="4">
      <FormLabel>Select collection</FormLabel>
      <Select overflow="hidden" value={selectedCollection?.id} onChange={handleSelect}>
        <option value="">Select an option</option>
        {collections.map(collection => (
          <option key={collection.id} value={collection.id}>
            {collection.displayName}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default CollectionsSelect;
