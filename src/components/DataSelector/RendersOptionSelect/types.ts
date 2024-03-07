import { CollectionConfig, LayerConfig } from "../../../types";

export type SelectProps = {
  collection: CollectionConfig;
  addLayer: (layerConfig: LayerConfig) => void;
}
