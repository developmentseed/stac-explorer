import { Source, Layer as GlLayer } from 'react-map-gl';
import { LayerConfig } from '../../types';
import { useCollection } from '../../hooks';
import { renderConfigToUrlParams } from '../../utils';

type Props = {
  config: LayerConfig
}

function Layer({ config }: Props) {
  const { id } = config;
  const { collection: collectionId, variable, timestep } = config.renderConfig;
  const { collection } = useCollection(collectionId);

  if (!collection) return null;

  const renderConfig = {
    variable,
    temporal: `${timestep!.split('T')[0]}T00:00:00Z`,
    concept_id: collection.stac.collection_concept_id,
    scale: 1,
    ...collection.stac.renders[variable!]
  }
  const { tiler } = collection;
  const tileUrl = `${tiler}?${renderConfigToUrlParams(renderConfig)}`;

  return (
    <Source
      id={id}
      type="raster"
      tiles={[tileUrl]}
      tileSize={256}
    >
      <GlLayer id={id} type="raster" />
    </Source>
  );
}

export default Layer;
