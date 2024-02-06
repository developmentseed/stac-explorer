import { useCallback, useState } from "react";
import { LayerConfig } from "../types";

type UseLayersFn = {
  layers: LayerConfig[];
  addLayer: (newLayer: LayerConfig) => void;
  updateLayer: (config: LayerConfig) => void;
}

function useLayers(): UseLayersFn {
  const [ layers, setLayers ] = useState<LayerConfig[]>([]);

  const addLayer = useCallback((newLayer: LayerConfig) => {
    setLayers([
      ...layers,
      newLayer
    ])
  }, [layers]);

  const updateLayer = useCallback((config: LayerConfig) => {
    const update = layers.map((layer) => {
      if (layer.id === config.id) {
        return config;
      } else {
        return layer;
      }
    });
    setLayers(update);
  }, [layers]);

  return {
    layers,
    addLayer,
    updateLayer
  }
}

export default useLayers;
