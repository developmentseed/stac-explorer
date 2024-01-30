import { Collection, CollectionConfig, LayerConfig } from "../../../types";

export type SelectProps = {
  config: CollectionConfig
  collection: Collection;
  addLayer: (layerConfig: LayerConfig) => void;
}
