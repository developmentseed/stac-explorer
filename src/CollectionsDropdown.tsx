import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';

const fetchCollections = () => {
  return fetch('collections.json')
    .then(response => response.json())
    .then(jsonData => jsonData);
}

type Collection = {
  id: string;
  collectionStacUrl: string;
  displayName: string;
  tiler: string;
}

const CollectionList = ({ collections }: { collections: Collection[] }) => {
    const [selectedCollection, setSelectedCollection] = useState<string>('');
  
    return (
      <Dropdown
        items={collections}
        valueKey="id"
        displayKey="displayName"
        selectedValue={selectedCollection}
        onSelectionChange={setSelectedCollection}
      />
    );
};

export default function CollectionsDropdown() {
  let [collections, setCollections] = useState([]);
  useEffect(() => {
    // Fetch the JSON file
    fetchCollections().then(setCollections);
  }, []);


  return (
    <div>
      {collections ? <CollectionList collections={collections} /> : 'Loading...'}
    </div>
  );
};
