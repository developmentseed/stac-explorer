import { useCallback, useEffect, useState } from "react";
import useCollections from "./useCollections";
import { StacCollection } from "stac-ts";

type UseCollectionFn = {
  isLoading: boolean;
  error?: string;
  collection?: StacCollection;
}

function useCollection(selectedCollection?: string): UseCollectionFn {
  const { collections } = useCollections();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>();

  const [ collectionCache, setCollectionCache ] = useState<Map<string, StacCollection>>(new Map<string, StacCollection>())
  const [ collection, setCollection ] = useState<StacCollection>();

  const getCollection = useCallback((id: string) => collectionCache.get(id), [collectionCache]);

  const addCollection = useCallback((id: string, collection: StacCollection) => {
    setCollectionCache(new Map(collectionCache.set(id, collection)));
  }, [collectionCache]);

  useEffect(() => {
    setCollection(undefined);
    setError(undefined);

    if (!collections || !selectedCollection) return;

    const collectionConfig = collections.find(({ id }) => selectedCollection === id);
    const { collectionStacUrl } = collectionConfig!;

    new Promise<StacCollection>((resolve, reject) => {
      const c = getCollection(selectedCollection);
      if (c) {
        resolve(c);
      } else {
        fetch(collectionStacUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Unable to fetch collection details.')
            }
            return response.json();
          })
          .then(response => {
            addCollection(selectedCollection, response);
            resolve(response);
          })
          .catch((err) => reject(err));
      }
    })
      .then(setCollection)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [addCollection, collections, getCollection, selectedCollection]);

  return {
    error,
    isLoading,
    collection
  };
}

export default useCollection;