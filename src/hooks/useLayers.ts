import { useCallback, useState } from "react";
import { LayerConfig } from "../types";

type UseLayersFn = {
  layers: LayerConfig[];
  addLayer: (newLayer: LayerConfig) => void;
}

function useLayers(): UseLayersFn {
  const [ layers, setLayers ] = useState<LayerConfig[]>([]);

  const addLayer = useCallback((newLayer: LayerConfig) => {
    setLayers([
      ...layers,
      newLayer
    ])
  }, [layers]);

  return {
    layers,
    addLayer
  }
}

export default useLayers;
