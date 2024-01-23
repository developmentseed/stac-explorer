import { useEffect, useState } from "react";
import { CollectionConfig } from "../types";

type UseCollectionsFn = {
  collections?: CollectionConfig[];
  isLoading: boolean;
}

function useCollections(): UseCollectionsFn {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ collections, setCollections] = useState<CollectionConfig[]>();

  useEffect(() => {
    setIsLoading(true);
    fetch('collections.json')
      .then(response => response.json())
      .then(setCollections)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    collections,
    isLoading
  }
}

export default useCollections;
