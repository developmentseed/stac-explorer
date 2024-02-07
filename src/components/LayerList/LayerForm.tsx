import { useCollection } from "../../hooks";
import { LayerConfig } from "../../types";
import CubeLayerForm from "./CubeLayerForm";

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

  const cubeVariables = collection && collection.stac["cube:variables"];

  if (cubeVariables) {
    return <CubeLayerForm config={config} collection={collection.stac} updateLayer={updateLayer} />
  }

  return null;
}

export default LayerForm;
