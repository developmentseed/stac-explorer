import { StacCollection } from "stac-ts";

export interface CollectionConfig {
  id: string;
  collectionStacUrl: string;
  displayName: string;
  tiler: string;
}

type GenericObject = {
  [key: string]: any  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type DataCubeCollection = {
  "cube:dimensions": GenericObject;
  "cube:variables": GenericObject;
}

export type Collection = StacCollection & DataCubeCollection;
