import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  ChakraProvider,
  Grid,
  GridItem,
  Select,
  Container,
} from "@chakra-ui/react";
import theme from "./theme";

const fetchCollections = () => {
  return fetch('collections.json')
    .then(response => response.json())
    .then(jsonData => jsonData);
}

interface Collection {
  id: string;
  collectionStacUrl: string;
  displayName: string;
  tiler: string;
}

interface CollectionListProps {
  collections: Collection[]; // Ensure this matches the type being passed
}

const CollectionList: React.FC<CollectionListProps> = ({ collections }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(event.target.value);
  };

  return (
    <div>
      <Select overflow="hidden" value={selectedCollection} onChange={handleSelectionChange}>
        <option value="">Select an Collection</option>
        {collections.map(collection => (
          <option key={collection.id} value={collection.displayName}>
            {collection.displayName}
          </option>
        ))}
      </Select>
    </div>
  );
};

const CollectionsDropdown = () => {
  const [data, setData] = useState(null);
  let collections: Collection[] = [];
  useEffect(() => {
    // Fetch the JSON file
    fetchCollections().then(setData);
  }, []);

  if (data) {
    collections = data;
  }

  return (
    <div>
      {data ? <CollectionList collections={collections} /> : 'Loading...'}
    </div>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container mx="auto" p="5" bgColor="white" boxShadow="md">
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(3, 1fr)'
        gap={4}>
          <GridItem w='100%' rowSpan={1} colSpan={1} bg='tomato'>
            <CollectionsDropdown />
          </GridItem>
          <GridItem rowSpan={6} colSpan={2} bg='lightblue'>map</GridItem>
          <GridItem rowSpan={5} colSpan={1} bg='papayawhip'>other selections</GridItem>
      </Grid>
      </Container>
    </ChakraProvider>
  );
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
