import { useCollection } from "../../hooks";
import { LayerConfig } from "../../types";
import CmrLayerForm from "./CmrLayerForm";

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

  const cubeVariables = collection && collection.stac.collection_concept_id;

  if (cubeVariables) {
    return <CmrLayerForm config={config} collection={collection.stac} updateLayer={updateLayer} />
  }

  return null;
}

export default LayerForm;
