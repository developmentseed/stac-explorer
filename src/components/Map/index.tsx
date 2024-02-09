import MbMap from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LayerConfig } from '../../types';
import Layer from './Layer';
import Boundaries from './Boundaries';

type Props = {
  layers: LayerConfig[];
}

function Map({ layers }: Props) {
  return (
    <MbMap
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 1,
      }}
      projection={{
        name: "mercator"
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <Boundaries beforeId="poi-label" />
      { layers
          .filter(({ isVisible }) => isVisible)
          .map((layer) => <Layer key={layer.id} config={layer} beforeId="boundaries-z0" />)
      }
    </MbMap>
  );
}

export default Map;
