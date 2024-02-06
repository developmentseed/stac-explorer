import MbMap from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
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
    />
  );
}

export default Map;
