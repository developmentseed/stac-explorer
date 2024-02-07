import MbMap from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LayerConfig } from '../../types';
import Layer from './Layer';

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
      { layers.map((layer) => <Layer key={layer.id} config={layer} />)}
    </MbMap>
  );
}

export default Map;
