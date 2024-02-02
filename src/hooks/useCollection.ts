import { useEffect, useState } from "react";
import useCollections from "./useCollections";
import { Collection, CollectionConfig } from "../types";
import { useCollectionsContext } from "../context/collections";

type UseCollectionFn = {
  isLoading: boolean;
  error?: string;
  collection?: Collection;
}

function useCollection(selectedCollection?: CollectionConfig): UseCollectionFn {
  const { collections } = useCollections();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>();

  const [ collection, setCollection ] = useState<Collection>();
  const { addCollection, getCollection } = useCollectionsContext();

  useEffect(() => {
    setCollection(undefined);
    setError(undefined);

    if (!collections || !selectedCollection) return;

    const collectionConfig = collections.find(({ id }) => selectedCollection.id === id);
    const { collectionStacUrl } = collectionConfig!;

    new Promise<Collection>((resolve, reject) => {
      const c = getCollection(selectedCollection.id);
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
            addCollection(selectedCollection.id, response);
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
