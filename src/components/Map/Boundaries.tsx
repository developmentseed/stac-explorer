import { Source, Layer } from 'react-map-gl';

type Props = {
  beforeId?: string;
}

function Boundaries({ beforeId }: Props) {
  return (
    <Source id="boundaries" type="vector" url="mapbox://mapbox.country-boundaries-v1">
      <Layer
        id="boundaries-z9"
        source="boundaries"
        source-layer="country_boundaries"
        type="line"
        minzoom={9}
        paint={{
          'line-color': 'rgba(238,238,238,.5)',
          'line-width': 5
        }}
        layout={{
          'line-join': 'round',
          'line-cap': 'round'
        }}
        beforeId={beforeId}
      />
      <Layer
        id="boundaries-z5"
        source="boundaries"
        source-layer="country_boundaries"
        type="line"
        minzoom={5}
        maxzoom={9}
        paint={{
          'line-color': 'rgba(238,238,238,.5)',
          'line-width': 5
        }}
        layout={{
          'line-join': 'round',
          'line-cap': 'round'
        }}
        beforeId={beforeId}
      />
      <Layer
        id="boundaries-z0"
        source="boundaries"
        source-layer="country_boundaries"
        type="line"
        minzoom={0}
        paint={{
          'line-color': '#bbb',
          'line-width': 1
        }}
        layout={{
          'line-join': 'round',
          'line-cap': 'round'
        }}
        beforeId={beforeId}
      />
    </Source>
  );
}

export default Boundaries;
