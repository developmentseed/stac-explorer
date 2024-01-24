import { useEffect, useState } from "react";
import useCollections from "./useCollections";
import { StacCollection } from "stac-ts";

type UseCollectionFn = {
  isLoading: boolean;
  error?: string;
  collection?: StacCollection;
}

function useCollection(selectedCollection?: string): UseCollectionFn {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>();

  const [ collection, setCollection ] = useState();
  const { collections } = useCollections();

  useEffect(() => {
    setError(undefined);
    if (!collections) return;

    if (!selectedCollection) {
      setCollection(undefined);
      return;
    }

    const collectionConfig = collections.find(({ id }) => selectedCollection === id);
    const { collectionStacUrl } = collectionConfig!;

    fetch(collectionStacUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to fetch collection details.')
        }
        return response.json();
      })
      .then(setCollection)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [collections, selectedCollection]);

  return {
    error,
    isLoading,
    collection
  };
}

export default useCollection;
