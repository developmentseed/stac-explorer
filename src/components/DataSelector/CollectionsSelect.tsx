import { Select } from "@chakra-ui/react";
import { CollectionConfig } from "../../types";

type Props = {
  collections?: CollectionConfig[];
  selectedCollection?: string;
  setSelectedCollection: (collectionId?: string) => void;
}

function CollectionsSelect({
  collections = [],
  selectedCollection,
  setSelectedCollection
}: Props) {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedCollection(event.target.value);

  return (
    <Select overflow="hidden" value={selectedCollection} onChange={handleSelect}>
      <option value="">Select an option</option>
      {collections.map(collection => (
        <option key={collection.id} value={collection.id}>
          {collection.displayName}
        </option>
      ))}
    </Select>
  );
}

export default CollectionsSelect;
