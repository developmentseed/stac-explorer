import { StacCollection as Collection } from "stac-ts";

type GenericObject = {
  [key: string]: any  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type StacRenderObject = {
  assets: string[];
  title?: string;
  rescale?: [number, number];
  nodata?: number | string;
  colormap_name?: string;
  colormap?: GenericObject;
  color_formula?: string;
  resampling?: string;
  expression?: string;
  minmax_zoom?: number[];
}

export type StacRender = {
  renders: {[key: string]: StacRenderObject};
}

export type DataCubeCollection = {
  "cube:dimensions": GenericObject;
  "cube:variables": GenericObject;
} & StacRender;

export type StacCollection = Collection & DataCubeCollection;

export type CollectionConfig = {
  id: string;
  collectionStacUrl: string;
  displayName: string;
  tiler: string;
  stac: StacCollection;
}

export type LayerConfig = {
  id: string;
  name: string;
  isVisible: boolean;
  renderConfig: {
    collection: string;
    variable?: string;
    timestep?: string;
  }
}
