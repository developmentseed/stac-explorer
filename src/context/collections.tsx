import { createContext, useCallback, useContext, useState } from "react";
import { Collection } from "../types";

type CollectionsContextType = {
  getCollection: (id: string) => Collection | undefined;
  addCollection: (id: string, collection: Collection) => void;
}

type CollectionsProviderType = {
  children: React.ReactNode;
}

export const CollectionsContext = createContext<CollectionsContextType>({} as CollectionsContextType);

export function CollectionsProvider({ children }: CollectionsProviderType) {
  const [ collectionCache, setCollectionCache ] = useState<Map<string, Collection>>(new Map<string, Collection>());

  const getCollection = useCallback((id: string) => collectionCache.get(id), [collectionCache]);

  const addCollection = useCallback((id: string, collection: Collection) => {
    setCollectionCache(new Map(collectionCache.set(id, collection)));
  }, [collectionCache]);

  const contextValue = {
    getCollection,
    addCollection
  }

  return (
    <CollectionsContext.Provider value={contextValue}>
      { children }
    </CollectionsContext.Provider>
  )
}

export function useCollectionsContext() {
  const {
    getCollection,
    addCollection
  } = useContext(CollectionsContext);

  return {
    getCollection,
    addCollection
  };
}
