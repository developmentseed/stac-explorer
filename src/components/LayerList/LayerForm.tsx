import { useCollection, useCollections } from "../../hooks";
import { LayerConfig } from "../../types";
import CubeLayerForm from "./CubeLayerForm";

type LayerFormProps = {
  config: LayerConfig;
  updateLayer: (config: LayerConfig) => void;
}

function LayerForm({ config, updateLayer }: LayerFormProps) {
  const { collection: collectionId } = config.config;
  const { collections, isLoading: collectionsIsLoading } = useCollections();
  const collectionConfig = collections?.find(({ id }) => id === collectionId);
  const { collection, isLoading: collectionIsLoading } = useCollection(collectionConfig);

  if (collectionsIsLoading || collectionIsLoading) {
    return <p>Loading...</p>
  }

  const cubeVariables = collection && collection["cube:variables"];

  if (cubeVariables) {
    return <CubeLayerForm config={config} collection={collection} updateLayer={updateLayer} />
  }

  return null;
}

export default LayerForm;
