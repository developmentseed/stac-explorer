import { createContext, useCallback, useContext, useState } from "react";
import { CollectionConfig } from "../types";

type CollectionsContextType = {
  getCollection: (id: string) => CollectionConfig | undefined;
  addCollection: (id: string, collection: CollectionConfig) => void;
}

type CollectionsProviderType = {
  children: React.ReactNode;
}

export const CollectionsContext = createContext<CollectionsContextType>({} as CollectionsContextType);

export function CollectionsProvider({ children }: CollectionsProviderType) {
  const [ collectionCache, setCollectionCache ] = useState<Map<string, CollectionConfig>>(new Map<string, CollectionConfig>());

  const getCollection = useCallback((id: string) => collectionCache.get(id), [collectionCache]);

  const addCollection = useCallback((id: string, collection: CollectionConfig) => {
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
