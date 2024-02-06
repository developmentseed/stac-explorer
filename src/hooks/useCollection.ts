import { useEffect, useState } from "react";
import useCollections from "./useCollections";
import { CollectionConfig } from "../types";
import { useCollectionsContext } from "../context/collections";

type UseCollectionFn = {
  isLoading: boolean;
  error?: string;
  collection?: CollectionConfig;
}

function useCollection(selectedCollection?: string): UseCollectionFn {
  const { collections } = useCollections();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>();

  const [ collection, setCollection ] = useState<CollectionConfig>();
  const { addCollection, getCollection } = useCollectionsContext();

  useEffect(() => {
    setIsLoading(true);
    setCollection(undefined);
    setError(undefined);

    if (!collections || !selectedCollection) return;

    new Promise<CollectionConfig>((resolve, reject) => {
      const c = getCollection(selectedCollection);
      if (c) {
        resolve(c);
      } else {
        const collectionConfig = collections.find(({ id }) => selectedCollection === id);
        const { collectionStacUrl } = collectionConfig!;

        fetch(collectionStacUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Unable to fetch collection details.')
            }
            return response.json();
          })
          .then(response => {
            const collection = {
              ...collectionConfig!,
              stac: response
            }
            addCollection(selectedCollection, collection);
            resolve(collection);
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
