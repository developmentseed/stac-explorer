import { useCollection } from "../../hooks";
import { LayerConfig } from "../../types";
import HlsLayerForm from "./HlsLayerForm";
import StacLayerForm from "./StacLayerForm";

type LayerFormProps = {
  config: LayerConfig;
  updateLayer: (config: LayerConfig) => void;
}

function LayerForm({ config, updateLayer }: LayerFormProps) {
  const { collection: collectionId } = config.renderConfig;
  const { collection, isLoading } = useCollection(collectionId);

  if (isLoading) {
    return <p>Loading...</p>
  }

  const cubeVariables = collection && collection.stac['cube:variables'];
  const datetime_range = collection && collection.datetime_range;

  if (cubeVariables) {
    return <StacLayerForm config={config} collection={collection.stac} updateLayer={updateLayer} />
  }

  if (datetime_range) {
    return <HlsLayerForm config={config} collection={collection.stac} updateLayer={updateLayer} />
  }

  return null;
}

export default LayerForm;
